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

router.get('/stats_students', async (req, res) =>  {
    await client.connect()

    const {teacher_id} = req.body

    const teacher = await client.db(DB_NAME).collection("teacher").findOne({_id: ObjectId(teacher_id)})
    let exams = await client.db(DB_NAME).collection("exam").find({teacher_id: ObjectId(teacher_id)})

    let teacher_exams = []

    exams = await exams.toArray()

    exams.forEach(exam => {
        teacher_exams.push(exam._id.toString())
    })

    let stats = []

    for (let student_id of teacher.students) {
        let student_stats = await client.db(DB_NAME).collection("stats").find({student_id: student_id})

        student_stats = await student_stats.toArray()

        student_stats.forEach(stat => {
            if (teacher_exams.includes(stat.exam_id.toString())) {
                stats.push(stat)
            }
        })
        
    }
    res.json(stats)
})

module.exports = router