const bcrypt = require('bcrypt')
const { DataTypes } = require('sequelize')

const UserInit = sequelize =>
	sequelize.define(
		'User',
		{
			id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
			address: { allowNull: false, unique: true, type: DataTypes.STRING(64) },
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			tableName: 'users',
			underscored: true,
			sequelize,
			defaultScope: {
				order: [['createdAt', 'DESC']],
			},
		}
	)

module.exports = { UserInit }
