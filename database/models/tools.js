const { Model, DataTypes } = require('sequelize')


class Tools extends Model {
	static init(connection) {
		super.init({
			user_id: DataTypes.INTEGER,
			title: DataTypes.STRING(60),
			link: DataTypes.STRING(85),
			description: DataTypes.STRING(150),
			tags: DataTypes.ARRAY(DataTypes.STRING(250))
		},
		{ sequelize: connection }
		)
	}

	static associate(models) {
		this.belongsTo(models.Users, {foreignKey: 'user_id', targetKey: 'id', as: 'user'})
	}
}


module.exports = Tools
