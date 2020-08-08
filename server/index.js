const express = require('express')
const teacher = require('./routes/teacher')
const student = require('./routes/student')
require('dotenv').config()
const app = express();

const PORT = 3000

<<<<<<< HEAD
app.use('/teacher/', teacher)
app.use('/student/', student)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.listen(PORT, () => { 
    console.log(`Example app listening at http://localhost:${PORT}`)
=======
app.use('/teacher', teacher)
app.use('/student', student)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
>>>>>>> 1cdf92efd23a517320cc2dfac282010534db2d05
})