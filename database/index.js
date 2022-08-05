const { UserInit } = require('./models/user.model')
const { SocialInit } = require('./models/social.model')
const { logger } = require('../utils/logger')

const Sequelize = require('sequelize')

const { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
	dialect: 'postgres',
	host: DB_HOST,
	port: Number(DB_PORT),
	timezone: 'utc',
	omitNull: false,
	define: {
		charset: 'utf8mb4',
		collate: 'utf8mb4_general_ci',
		underscored: true,
		freezeTableName: true,
	},
	pool: {
		min: 0,
		max: 5,
	},
	logQueryParameters: NODE_ENV === 'development',
	logging:
		NODE_ENV === 'development'
			? (query, time) => {
					logger.info(time + 'ms' + ' ' + query)
			  }
			: false,
	benchmark: NODE_ENV === 'development',
})

const DB = {
	User: UserInit(sequelize),
	Social: SocialInit(sequelize),

	sequelize, // connection instance (RAW queries)
	Sequelize, // library
}

DB.Social.belongsTo(DB.User, { foreignKey: 'user_id', as: 'user' })
DB.User.hasMany(DB.Social, { foreignKey: 'user_id', as: 'socials' })

module.exports = DB
