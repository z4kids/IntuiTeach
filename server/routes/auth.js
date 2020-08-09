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
    //Get the user's information
    const user = await fetch('https://api.zoom.us/v2/users/me', {
        headers: {
            Authorization: `Bearer ${response.access_token}`
        }
    })
    console.log(await user.json())
    //TODO: Add new users to database, and determine their role
    
    res.sendStatus(200)
})
module.exports = router