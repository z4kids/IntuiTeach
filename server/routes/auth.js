const express = require('express')
const fetch = require('node-fetch')
const client = require('../db/connection')

const DB_NAME = "z4kidz"

const router = express.Router()

router.get('/', (req, res) => {
    res.redirect(`https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${process.env.ZOOM_REDIRECT_URI}`)
})
router.get('/redirect', async (req, res) => {
    await client.connect()

    const raw = await fetch(`https://zoom.us/oauth/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${process.env.ZOOM_REDIRECT_URI}`, {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64')
        }
    })
    const response = await raw.json()
    //Get the user's information
    let user = await fetch('https://api.zoom.us/v2/users/me', {
        headers: {
            Authorization: `Bearer ${response.access_token}`
        }
    })
    user = await user.json()
    req.session.access_token = response.access_token
    console.log(req.session.access_token)
    req.session.user = user
    //Add new users to database
    let teacher = {
        zoom_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name
    }
    await client.db(DB_NAME).collection('teacher').updateOne({zoom_id: user.id}, {$set: teacher}, {upsert: true})
    res.sendStatus(200)
})
module.exports = router