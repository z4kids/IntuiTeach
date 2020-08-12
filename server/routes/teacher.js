const express = require('express')
const url = require('url')
const router = express.Router();
const client = require('../db/connection.js')
const fetch = require('node-fetch')
const {ObjectId} = require('mongodb');
const isLoggedIn = require('../login.js');

const DB_NAME = "z4kidz"

// API to get all the exams written by a teacher 
router.get('/exam', async (req, res) => {
  await client.connect()

  const teacher_id = (await client.db(DB_NAME).collection('teacher').findOne({zoom_id: req.session.user.id}))._id

  let teacher_exams = await client.db(DB_NAME).collection('exam').find({teacher_id: teacher_id})

  teacher_exams.toArray()

  let exams = []

  teacher_exams.forEach(exam => {
    exams.push({
      name: exam.name,
      id: exam._id
    })
  })


  res.json(exams)

})
//API for teacher to add new exam
router.post('/exam', isLoggedIn, async (req, res) => {
    await client.connect()
    const {exam_name} = req.body

    const teacher_id = (await client.db(DB_NAME).collection('teacher').findOne({zoom_id: req.session.user.id}))._id

    const exam = {
        name:exam_name,
        questions: [],
        teacher_id
    }

    const result = await client.db(DB_NAME).collection("exam").insertOne(exam)

    console.log(`New exam created with the following id: ${result.insertedId}`);
    res.sendStatus(200)
})

//API to get all the questions of a exam
router.get('/question', async (req, res) => {
  await client.connect()

  const {exam_id} = req.body

  const exam = await client.db(DB_NAME).collection('exam').findOne({_id: ObjectId(exam_id)})

  let questions = []

  for (let question_id of exam.questions) {
    question = await client.db(DB_NAME).collection('question').findOne({_id: ObjectId(question_id)})
    questions.push(question)
  }

  res.json(questions)

})

// API for teacher to add new question to exam
router.post('/question', isLoggedIn, async (req, res) => {
    await client.connect()

    const teacher_id = (await client.db(DB_NAME).collection('teacher').findOne({zoom_id: req.session.user.id}))._id

    // Deconstructs the prompt of the question, the list of the answers, the correct answer, and the max time to answer the question
    const {prompt, list_of_answers, correct_answer, max_time, points, exam_id} = req.body

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

    const teacher = await client.db(DB_NAME).collection("exam").findOne({_id: ObjectId(exam_id), teacher_id})

    const new_teacher_question = {
      questions: (teacher.questions) ? [...teacher.questions, ObjectId(String(result.insertedId))] : [ObjectId(String(result.insertedId))],
    }
    await client.db(DB_NAME).collection("exam").updateOne({_id: ObjectId(exam_id)}, {$set: new_teacher_question})

    console.log(`New question created with the following id: ${result.insertedId}`);
    res.sendStatus(200)
  })

// API for teacher to delete a question 
router.delete('/question', isLoggedIn, async (req, res) => {
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

//API to post a new reward
router.post('/reward', isLoggedIn, async (req, res) => {
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


router.get('/meeting', isLoggedIn, async (req, res) => {
  const {exam_id, zoom_link} = req.body
  let join_url = new url.URL(zoom_link)
  join_url.host = 'localhost:3000'
  join_url.searchParams.append('exam', exam_id)
  res.json({
    join_url,
  })
})
router.get('/info', async (req, res) => {
  if (req.session.user) {
    console.log(req.session.user)
    res.json({
      name: req.session.user.first_name + ' ' + req.session.user.last_name,
      profile_pic: req.session.user.pic_url
    })
  } else {
    console.log('No user!')
    res.send(null)
  }
})
module.exports = router;