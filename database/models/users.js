const { Model, DataTypes } = require('sequelize')


class Users extends Model {
	static init(connection) {
		super.init(
			{
				name: DataTypes.STRING(85),
				email: DataTypes.STRING(60),
				password: DataTypes.STRING(65),
				phone: DataTypes.STRING(14),
				cpf: DataTypes.STRING(18),
				uf: DataTypes.STRING(2)
			},
			{
				scopes: {
					withoutSensibleData: {
						attributes: {
							exclude: ['email', 'password', 'phone', 'cpf']
						},
					}
				},
				sequelize: connection
			}
		)
	}

	static associate(models) {
		this.hasMany(models.Tools, {foreignKey: 'user_id', targetKey: 'id', as: 'tools'})
	}
}


module.exports = Users
