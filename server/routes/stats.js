const express = require('express')
const router = express.Router();
const client = require('../db/connection.js')
const {ObjectId} = require('mongodb')

DB_NAME = "z4kidz"

router.get('/stats_exam', async (req, res) => {
    await client.connect()

    const {exam_id} = req.body

    const stats = await client.db(DB_NAME).collection("stats").find({exam_id: ObjectId(exam_id)})

    const results = await stats.toArray()

    let stats_exam = []
    results.forEach(stat => {
        delete stat.exam_id
        stats_exam.push(stat)
    })
    res.json(stats_exam)
})

module.exports = router