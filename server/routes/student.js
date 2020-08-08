const express = require('express')
const client = require('../db/connection')
const {ObjectId} = require('mongodb')

const router = express.Router()

const DB_NAME = 'z4kidz'

router.post('/answer', async (req, res) => {
    await client.connect()
    //Decontruct the request body
    const {question_id, student_name, answer, time_answer} = req.body
    const previous = await client.db(DB_NAME).collection('response').findOne({question_id, student_name})

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
    const result = await client.db(DB_NAME).collection('response').updateOne({question_id, student_name}, {
        $set: response
    }, {
        upsert: true
    })
    res.sendStatus(200)
})

module.exports = router