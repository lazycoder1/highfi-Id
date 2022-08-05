const { cleanEnv, port, str } = require('envalid')
const { config } = require('dotenv')

config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

function validateEnv() {
	cleanEnv(process.env, {
		PORT: port(),
	})
}

module.exports = validateEnv()
