const express = require('express')
const router = express.Router();

router.post('/post', (req, res) => {
    res.send('Got a POST request')
  })

module.exports = router;