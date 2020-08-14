const express = require('express')
const client = require('../db/connection')
const {ObjectId} = require('mongodb')
const { startSession } = require('../db/connection')

const router = express.Router()

const DB_NAME = 'z4kidz'

/**
 * Handles when a student joins a meeting
 */
router.post('/join', async (req, res) => {
    await client.connect()
    const {name, student_zoom_id, teacher_zoom_id} = req.body
    const old_student  = await client.db(DB_NAME).collection('student').findOne({zoom_id: student_zoom_id})
    const teacher = await client.db(DB_NAME).collection('teacher').findOne({zoom_id: teacher_zoom_id})
    let new_student = {}
    //Check to see if there is already a record for this student
    if (old_student) {
        //Only add this teacher if the student doesn't have them
        const hasTeacher = old_student.teachers.some(teach => {
            return teach.equals(teacher._id);
        });
        new_student = {
            teachers: (hasTeacher) ? old_student.teachers : [...old_student.teachers, teacher._id]
        }
    } else {
        new_student = {
            name,
            zoom_id: student_zoom_id,
            teachers: [teacher._id]
        }
    } 
    await client.db(DB_NAME).collection('student').updateOne({zoom_id: student_zoom_id}, {$set: new_student}, {upsert: true})
    const student = await client.db(DB_NAME).collection('student').findOne(new_student)
    //Update the list of students for the teacher if the student isn't in the list
    const hasStudent = teacher.students.length > 0 && teacher.students.some(stud => {
        return stud.equals(student._id);
    });
    const new_teacher = {
        students: (hasStudent) ? teacher.students : [...teacher.students, student._id]
    }
    await client.db(DB_NAME).collection('teacher').updateOne({_id: teacher._id}, {$set: new_teacher})
    //Send the student's id relative to our database
    res.json({id: student._id})
})
/**
 * Handles when the student changes their answer (but not when the submit it)
 * (As of now, not useful AND OUT OF DATE since we aren't tracking previous answers)
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
    const {student_id, exam_id, question_index, answer, submit_time, teacher_zoom_id} = req.body;
    const teacher = await client.db(DB_NAME).collection('teacher').findOne({zoom_id: teacher_zoom_id})
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
            teacher_id: teacher._id,
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
    res.json({correct})
})
/**
 * Handles when a student is getting the question being asked by the teacher
 */
router.get('/questions', async (req, res) => {
    await client.connect();
    const {exam_id} = req.query;
    //Get the exam
    const exam = await client.db(DB_NAME).collection('exam').findOne({_id: ObjectId(exam_id)})
    //Fill up the aray of questions
    let questions = []
    for (let q_id of exam.questions) {
        //Get the question corresponding to each id in the exam.questions
        let question = await client.db(DB_NAME).collection('question').findOne({_id: q_id})
        delete question.correct
        questions.push(question)
    }
    //Send the list of questions
    res.json({questions})
})
module.exports = router