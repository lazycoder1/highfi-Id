const express = require('express')
const passport = require('passport')
const DB = require('../database')
const path = require('path')
const router = express.Router()

//====================twitter auth=========================
router.get('/twitter', passport.authenticate('twitter', { scope: ['tweet.read', 'users.read', 'offline.access'] }))
router.get(
	'/twitter/callback',
	passport.authenticate('twitter', {
		failureRedirect: '/auth/error',
	}),
	function (req, res) {
		res.redirect(`/auth/complete?user=${req.session?.passport?.user?.identifier}`)
	}
)
//====================discord auth=========================
router.get('/discord', passport.authenticate('discord'))
router.get(
	'/discord/callback',
	passport.authenticate('discord', {
		failureRedirect: '/auth/error',
	}),
	function (req, res) {
		res.redirect(`/auth/complete?user=${req.session?.passport?.user?.identifier}`)
	}
)

//auth views
router.get('/complete', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/public/auth', 'complete.html'))
})
router.get('/error', function (req, res) {
	res.status(500).send('Some error')
})

router.get('/socials', async (req, res, next) => {
	const address = req.query.address
	const user = address && (await DB.User.findOne({ where: { address }, include: ['socials'] }))
	user?.socials ? res.json({ socials: user.socials }) : res.status(404).json({ error: 'No socials' })
})

module.exports = router
