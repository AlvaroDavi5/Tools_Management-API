'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('tools', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users', // table name, not model name
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			title: {
				type: Sequelize.STRING(60)
			},
			link: {
				type: Sequelize.STRING(85)
			},
			description: {
				type: Sequelize.STRING(150)
			},
			tags: {
				type: Sequelize.ARRAY(Sequelize.STRING(250))
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: new Date()
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: new Date()
			}
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('tools')
	}
}
