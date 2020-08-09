const express = require('express')
const fetch = require('node-fetch')

const router = express.Router()

router.get('/', (req, res) => {
    res.redirect(`https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${process.env.ZOOM_REDIRECT_URI}`)
})
router.get('/redirect', async (req, res) => {
    const raw = await fetch(`https://zoom.us/oauth/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${process.env.ZOOM_REDIRECT_URI}`, {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64')
        }
    })
    const response = await raw.json()
    res.sendStatus(200)
})
module.exports = router