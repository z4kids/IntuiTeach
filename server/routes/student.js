const express = require('express')
const client = require('../db/connection')
const {ObjectId} = require('mongodb')

const router = express.Router()

const DB_NAME = 'z4kidz'

router.post('/join', async (req, res) => {
    await client.connect()
    const {name, meeting_id} = req.body
    const teacher_zoom_id = "1" //TODO: get teacher id using zoom api after implementing oauth
    const teacher = await client.db(DB_NAME).collection('teacher').findOne({zoom_id: teacher_zoom_id})
    const result = await client.db(DB_NAME).collection('student').insertOne({
        name,
        teacher: teacher._id,
        meeting_id,
        points: 0
    })
    res.json(result.insertedId)
})
/**
 * Handles when the student changes their answer (but not when the submit it)
 */
router.post('/answer', async (req, res) => {
    await client.connect()
    //Decontruct the request body
    const {question_id, student_name, answer, time_answer} = req.body
    const previous = await client.db(DB_NAME).collection('response').findOne({question_id: ObjectId(question_id), student_name})

    //Create the user's new response
    const response = {
        question_id: ObjectId(question_id),
        student_name,
        prev_answers: (previous) ? [...previous.prev_answers, previous.answer] : [],
        answer,
        time_answer,
        time_submit: 0
    }
    //Get the student with the name specified in the request
    const result = await client.db(DB_NAME).collection('response').updateOne({question_id: ObjectId(question_id), student_name}, {
        $set: response
    }, {
        upsert: true
    })
    res.sendStatus(200)
})
/**
 * Handles when the student submits their answer, and tells them if they are right or not!
 */
router.post('/submit', async (req, res) => {
    await client.connect()
    //Deconstruct the request body
    const {question_id, student_name, submit_time} = req.body;
    //Get the question from the database (so that we can compare the correct answer)
    const question = await client.db(DB_NAME).collection('question').findOne({_id: ObjectId(question_id)})
    //Get the student's response from the database
    const response = await client.db(DB_NAME).collection('response').findOneAndUpdate({question_id: ObjectId(question_id), student_name}, {$set: {submit_time}})
    //Send a boolean that's true if the student's answer matches the correct answer
    res.json(question.correct === response.value.answer)
})
/**
 * Handles when a student is getting the question being asked by the teacher
 */
router.get('/question', async (req, res) => {
    await client.connect();
    const {name, meeting_id} = req.body;
    const student = await client.db(DB_NAME).collection('student').findOne({name, meeting_id})
    const teacher = await client.db(DB_NAME).collection('teacher').findOne({_id: student.teacher})
    const question = await client.db(DB_NAME).collection('question').findOne({_id: teacher.current_question})
    res.json(question)
})
module.exports = router