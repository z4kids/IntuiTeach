const express = require('express')
const router = express.Router();
const client = require('../db/connection.js')
const {ObjectId} = require('mongodb')

DB_NAME = "z4kidz"

router.get('/exam', async (req, res) => {
    await client.connect()

    const {exam_id} = req.query

    const stats = await client.db(DB_NAME).collection("stats").find({exam_id: ObjectId(exam_id)})

    const results = await stats.toArray()

    let stats_exam = []
    results.forEach(stat => {
        delete stat.exam_id
        stats_exam.push(stat)
    })
    for (let i = 0; i < results.length; i++) {
        s_id = stats_exam[i].student_id
        q_id = stats_exam[i].question_id
        let student = await client.db(DB_NAME).collection("student").findOne({_id: s_id})

        stats_exam[i] = {
            ...stats_exam[i],
            student_name: student.name
        }
    }

    res.json(stats_exam)
})

router.get('/student', async (req, res) =>  {
    await client.connect()

    const teacher = await client.db(DB_NAME).collection("teacher").findOne({zoom_id: req.session.user.id})

    let stats = []

    for (let student_id of teacher.students) {
        console.log(student_id)
        let student_stats = await client.db(DB_NAME).collection("stats").find({student_id: student_id, teacher_id: ObjectId(teacher_id)})

        student_stats = await student_stats.toArray()

        student_stats.forEach(stat => {
            stats.push(stat)
            })
        
    }
    res.json(stats)
})

module.exports = router