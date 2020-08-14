const express = require('express')
const router = express.Router();
const client = require('../db/connection.js')
const {ObjectId} = require('mongodb')

DB_NAME = "z4kidz"

// API to retrieve all the stats for a specific exam
router.get('/exam', async (req, res) => {
    await client.connect()

    const {exam_id} = req.query

    const stats = await client.db(DB_NAME).collection("stats").find({exam_id: ObjectId(exam_id)})

    const results = await stats.toArray()

    let stats_exam = []
    results.forEach(stat => {
        stats_exam.push(stat)
    })

    let correct_answers = []
    let question_names = []

    for (let i = 0; i < results.length; i++) {
        s_id = stats_exam[i].student_id
        e_id = stats_exam[i].exam_id
        let student = await client.db(DB_NAME).collection("student").findOne({_id: s_id})
        let exam = await client.db(DB_NAME).collection("exam").findOne({_id: e_id})

        for (let q_id of exam.questions) {
            let question = await client.db(DB_NAME).collection("question").findOne({_id: q_id})
            if (!(correct_answers.includes(question.correct))) {
                correct_answers.push(question.correct)
            }
            if (!(question_names.includes(question.prompt))) {
                question_names.push(question.prompt)
            }
        }

        stats_exam[i] = {
            ...stats_exam[i],
            student_name: student.name,
            correct_answers: correct_answers,
            question_names: question_names
        }
    }

    res.json(stats_exam)
})

// API to get all the stats of teacher's students
router.get('/student', async (req, res) =>  {
    await client.connect()

    const teacher = await client.db(DB_NAME).collection("teacher").findOne({zoom_id: "jo2i343oajfdapb"})

    let stats = []
    let correct_answers = []
    let question_names = []

    for (let student_id of teacher.students) {
        let student_stats = await client.db(DB_NAME).collection("stats").find({student_id: student_id, teacher_id: ObjectId(teacher._id)})

        student_stats = await student_stats.toArray()

        student_stats.forEach(stat => {
            stats.push(stat)
            })

            for (let i = 0; i < student_stats.length; i++) {
                s_id = stats[i].student_id
                e_id = stats[i].exam_id
                let student = await client.db(DB_NAME).collection("student").findOne({_id: s_id})
                let exam = await client.db(DB_NAME).collection("exam").findOne({_id: e_id})
        
                for (let q_id of exam.questions) {
                    let question = await client.db(DB_NAME).collection("question").findOne({_id: q_id})
                    if (!(correct_answers.includes(question.correct))) {
                        correct_answers.push(question.correct)
                    }
                    if (!(question_names.includes(question.prompt))) {
                        question_names.push(question.prompt)
                    }
                }
        
                stats[i] = {
                    ...stats[i],
                    student_name: student.name,
                    correct_answers: correct_answers,
                    question_names: question_names
                }
            }
        
    }
    res.json(stats)
})

module.exports = router