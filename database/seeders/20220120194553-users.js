'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('users', [
			{
				name: "Alvaro",
				email: "alvaro-alves@nomail.edu",
				password: "ee7d81103f122bb171ce1eb2b8da9b44403f2b2da7924b48b3fafe0ba36b5a81",
				phone: "27999999999",
				cpf: "000.123.111-60",
				uf: "BA"
			},
		], {})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', null, {})
	}
}
