const express = require('express')
const router = express.Router()
const { generateNonce, SiweMessage } = require('siwe')
const DB = require('../database')

router.get('/nonce', async (req, res) => {
	req.session.nonce = generateNonce()
	await req.session.save()
	res.setHeader('Content-Type', 'text/plain')
	res.send(req.session.nonce)
})
router.post('/verify', async (req, res) => {
	try {
		const { message, signature } = req.body
		const siweMessage = new SiweMessage(message)
		const fields = await siweMessage.validate(signature)
		if (fields.nonce !== req.session.nonce) return res.status(422).json({ message: 'Invalid nonce.' })
		req.session.siwe = { ...fields }
		const [user, created] = await DB.User.findOrCreate({
			where: { address: fields.address.toLowerCase() },
			defaults: { address: fields.address.toLowerCase() },
		})
		user && (req.session.user = user)
		await req.session.save()
		res.json({ ok: true })
	} catch (error) {
		console.log(error)
		res.json({ ok: false })
	}
})
router.get('/me', async (req, res) => {
	const address = req.session?.siwe?.address?.toLowerCase()
	const user = address && (await DB.User.findOne({ where: { address }, include: ['socials'] }))
	res.send({ user, address })
})
router.get('/logout', async (req, res) => {
	req.session.destroy()
	res.send({ ok: true })
})

module.exports = router
