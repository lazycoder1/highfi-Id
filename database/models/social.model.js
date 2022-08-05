const { DataTypes } = require("sequelize")

const SocialInit = sequelize =>
	sequelize.define(
		"Social",
		{
			id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
			user_id: { allowNull: false, type: DataTypes.INTEGER },
			identifier: { type: DataTypes.STRING },
			social_media: { type: DataTypes.STRING },
			access_token: { type: DataTypes.STRING },
			refresh_token: { type: DataTypes.STRING },
			confirmation: { type: DataTypes.STRING },
			send_notification: { type: DataTypes.BOOLEAN },
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			tableName: "socials",
			underscored: true,
			sequelize,
			defaultScope: {
				order: [["createdAt", "DESC"]],
			},
		},
	)

module.exports = { SocialInit }
