const express = require('express')
const teacher = require('./routes/teacher')
const student = require('./routes/student')
const app = express();

const PORT = 3000

app.use('/teacher/', teacher)
app.use('/student/', student)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.listen(PORT, () => { 
    console.log(`Example app listening at http://localhost:${PORT}`)
})