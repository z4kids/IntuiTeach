const express = require('express')
const client = require('../db/connection')
const {ObjectId} = require('mongodb')
const { startSession } = require('../db/connection')

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
 * (As of now, not useful since we aren't tracking previous answers)
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
    const {student_id, exam_id, question_index, answer, submit_time} = req.body;
    let stats = await client.db(DB_NAME).collection('stats').findOne({student_id: ObjectId(student_id), exam_id: ObjectId(exam_id)})
    //If the student already has a stats page for this exam 
    if (stats) {
        //Update the existing answers
        stats.answers[question_index] = answer
        stats.times[question_index] = submit_time
    } else {
        //Create a new stats object
        stats = {
            student_id: ObjectId(student_id),
            exam_id: ObjectId(exam_id),
            answers: [answer],
            times: [submit_time],
            points: 0
        }
    }
    //Get the question to determine if the student got it right
    const exam = await client.db(DB_NAME).collection('exam').findOne({_id: ObjectId(exam_id)})
    const question = await client.db(DB_NAME).collection('question').findOne({_id: exam.questions[question_index]})
    //Update the points if they got it right
    const correct = question.correct === stats.answers[question_index]
    stats.points += (correct) ? question.points : 0
    //Update the statistics
    await client.db(DB_NAME).collection('stats').updateOne({student_id: ObjectId(student_id), exam_id: ObjectId(exam_id)}, {$set: stats}, {upsert: true})
    //Send back if they got it right
    //An alternative to this is to have the frontend call another get route,
    //where is gets the number of points and compares it against its state.
    //If the number of points is greate than the number of points in the state,
    //the student must've gotten it correct
    res.json(correct)
})
/**
 * Handles when a student is getting the question being asked by the teacher
 */
router.get('/question', async (req, res) => {
    await client.connect();
    const {exam_id} = req.body;
    //Get the exam
    const exam = await client.db(DB_NAME).collection('exam').findOne({_id: ObjectId(exam_id)})
    //Fill up the aray of questions
    let questions = []
    for (let q_id of exam.questions) {
        //Get the question corresponding to each id in the exam.questions
        const question = await client.db(DB_NAME).collection('question').findOne({_id: q_id}) 
        questions.push(question)
    }
    //Send the list of questions
    res.json(questions)
})
module.exports = router