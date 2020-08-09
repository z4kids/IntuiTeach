const express = require('express')
const teacher = require('./routes/teacher')
const student = require('./routes/student')
const stats = require('./routes/stats')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express();

const PORT = 3000

app.use(bodyParser.json())
app.use('/teacher', teacher)
app.use('/student', student)
app.use('/stats', stats)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})