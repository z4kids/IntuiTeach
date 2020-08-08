const express = require('express')
const teacher = require('./routes/teacher')
const student = require('./routes/student')
const app = express();

const PORT = 3000

app.all('/teacher', teacher)
app.all('/student', student)

app.listen(PORT)