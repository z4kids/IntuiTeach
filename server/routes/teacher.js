const express = require('express')
const router = express.Router();
const client = require('../db/connection.js')
console.log("This is client: ", client)

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

module.exports = router;