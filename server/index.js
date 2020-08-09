const express = require('express')
const teacher = require('./routes/teacher')
const student = require('./routes/student')
const stats = require('./routes/stats')
const auth = require('./routes/auth')
const bodyParser = require('body-parser')
const session = require('express-session')
require('dotenv').config()
const app = express();

const PORT = 3000

app.use(bodyParser.json())
app.use(session({
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    resave: true
}))
app.use('/teacher', teacher)
app.use('/student', student)
app.use('/stats', stats)
app.use('/auth', auth)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})