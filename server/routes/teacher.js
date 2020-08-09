const express = require('express')
const url = require('url')
const router = express.Router();
const client = require('../db/connection.js')
const fetch = require('node-fetch')
const {ObjectId} = require('mongodb')

const DB_NAME = "z4kidz"

//API for teacher to add new exam
router.post('/exam', async (req, res) => {
    await client.connect()

    const {exam_name, teacher_id} = req.body

    const exam = {
        name:exam_name,
        question: [],
        teacher_id: ObjectId(teacher_id)

    }

    const result = await client.db(DB_NAME).collection("exam").insertOne(exam)

    console.log(`New exam created with the following id: ${result.insertedId}`);
    res.sendStatus(200)
})
// API for teacher to add new question to exam
router.post('/question', async (req, res) => {
    await client.connect()
    // Deconstructs the prompt of the question, the list of the answers, the correct answer, and the max time to answer the question
    const {prompt, list_of_answers, correct_answer, max_time, points, teacher_id, exam_id} = req.body

    // writing JSON file to pass to Mongo client, making sure it is in the same JSON format on MongoDB database 
    const question = {
        prompt,
        options: list_of_answers,
        correct: correct_answer,
        max_time,
        points
    }

    // inserts the new question and its parameters 
    const result = await client.db(DB_NAME).collection("question").insertOne(question)

    // Updates the teacher's list of asked quesitons

    const teacher = await client.db(DB_NAME).collection("exam").findOne({teacher_id:ObjectId(teacher_id)})

    const new_teacher_question = {
      questions: (teacher.questions) ? [...teacher.questions, ObjectId(String(result.insertedId))] : [ObjectId(String(result.insertedId))],
    }
    await client.db(DB_NAME).collection("exam").updateOne({_id: ObjectId(exam_id)}, {$set: new_teacher_question})

    console.log(`New question created with the following id: ${result.insertedId}`);
    res.sendStatus(200)
  })

// API for teacher to delete a question 
router.delete('/question', async (req, res) => {
    await client.connect()
    // Deconstructs the question id of the question the teacher wants deleted 
    const {question_id, exam_id} = req.body

    // Constructs JSON file to pass into client 
    const question_deleted = {
      _id: ObjectId(question_id)
    }

    // Finds the quesiton id sent by the request and deletes it 
    const result = await client.db(DB_NAME).collection("question").deleteOne(question_deleted)

    await client.db(DB_NAME).collection("exam").findOneAndUpdate({_id: ObjectId(exam_id)}, {$pull: {questions: ObjectId(question_id)}})

    console.log(`${result.deletedCount} document(s) was/were deleted.`)
    res.sendStatus(200)

})

router.post('/reward', async (req, res) => {
    await client.connect()

    const {reward_name, reward_cost} = req.body

    const reward = {
      name: reward_name,
      cost: reward_cost
    }

    const result = await client.db(DB_NAME).collection("rewards").insertOne(reward)

    console.log(`New reward created with the following id: ${result.insertedId}`);
    res.sendStatus(200)
})
router.get('/meeting', async (req, res) => {
  const {exam_id} = req.body
  console.log(req.session.access_token)
  let meeting = await fetch(`https://api.zoom.us/v2/users/${req.session.user.id}/meetings`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${req.session.access_token}`
    }
  })
  meeting = await meeting.json()
  const join_url = url.parse(meeting.join_url)
  const create_url = url.parse(meeting.start_url)
  join_url.searchParams.append('exam', exam_id)
  create_url.searchParams.append('exam', exam_id)
  res.json({
    join_url,
    create_url
  })
})
module.exports = router;