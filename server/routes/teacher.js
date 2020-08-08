const express = require('express')
const router = express.Router();
const client = require('../db/connection.js')
const {ObjectId} = require('mongodb')

DB_NAME = "z4kidz"
// API for teacher to add new question
router.post('/new_question', async (req, res) => {
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
router.post('/delete_question', async (req, res) => {
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

module.exports = router;