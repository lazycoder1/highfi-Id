"use strict"
const bcrypt = require("bcryptjs")

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"users",
			[
				{
					email: "root@bidcrm.com",
					role: "root",
					password: bcrypt.hashSync("123123123", 10),
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					email: "customer@bidcrm.com",
					role: "customer",
					password: bcrypt.hashSync("123123123", 10),
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					email: "writer@bidcrm.com",
					role: "writer",
					password: bcrypt.hashSync("123123123", 10),
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{},
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("users", null, {})
	},
}
