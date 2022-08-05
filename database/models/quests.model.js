const bcrypt = require('bcrypt')
const { DataTypes } = require('sequelize')

const UserInit = sequelize =>
	sequelize.define(
		'Quests',
		{
			id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
			questType: {type: DataTypes.STRING},
            organizationId: {type: DataTypes.STRING},
            reward: {type: DataTypes.STRING},
            deadline: {type: DataTypes.STRING},
            rewardGenerationType: {type: DataTypes.STRING},
            winner: {type: DataTypes.STRING},
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
