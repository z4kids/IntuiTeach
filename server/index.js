const express = require('express')
const teacher = require('./routes/teacher')
const student = require('./routes/student')
const stats = require('./routes/stats')
const auth = require('./routes/auth')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()
const app = express();

const PORT = 3654

//Use the bodyParser to get the information from the request body
app.use(bodyParser.json())
//Start a session to keep track of when a teacher is logged in
app.use(session({
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    resave: true
}))
app.use(cors({
    origin: true,
    credentials: true
}))
app.use('/teacher', teacher)
app.use('/student', student)
app.use('/stats', stats)
app.use('/auth', auth)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})