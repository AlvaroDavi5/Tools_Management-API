'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('tools', [
			{
				user_id: 1,
				title: "Notion",
				link: "https://notion.so",
				description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
				tags: "organization;planning;collaboration;writing;calendar"
			}
		], {})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('tools', null, {})
	}
}
