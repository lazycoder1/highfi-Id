require("dotenv").config({ path: `.env.${process.env.NODE_ENV || "development"}` })

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

module.exports = {
	development: {
		username: DB_USER,
		password: DB_PASSWORD,
		database: DB_DATABASE,
		host: DB_HOST,
		port: DB_PORT,
		dialect: "postgres",
	},
	production: {
		username: DB_USER,
		password: DB_PASSWORD,
		database: DB_DATABASE,
		host: DB_HOST,
		port: DB_PORT,
		dialect: "postgres",
	},
}
