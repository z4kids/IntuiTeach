const express = require('express')
const router = express.Router();
const client = require('../db/connection.js')
const {ObjectId} = require('mongodb')

router.post('/new_question', async (req, res) => {
    await client.connect()
    const {prompt, list_of_answers, correct_answer, max_time} = req.body

    const question = {
        prompt,
        options: list_of_answers,
        correct: correct_answer,
        max_time,
    }

    const result = await client.db("z4kidz").collection("question").insertOne(question)

    console.log(`New question created with the following id: ${result.insertedId}`);
    res.sendStatus(200)
  })

router.post('/delete_question', async (req, res) => {
    await client.connect()
    const {question_id} = req.body

    const question_deleted = {
      _id: ObjectId(question_id)
    }

    const result = await client.db("z4kidz").collection("question").deleteOne(question_deleted)

    console.log(`${result.deletedCount} document(s) was/were deleted.`)
    res.sendStatus(200)

})

module.exports = router;