const express = require('express')
const router = express.Router()

router.post('/answer', (req, res) => {
    res.send("Got it!")
})

module.exports = router