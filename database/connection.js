const Sequelize = require('sequelize')
const DBConfig = require("./dbConfig.js")


/* connecting to a database */
const connection = new Sequelize(DBConfig)

/* testing the connection */
try {
	connection.authenticate()
	console.log('Database connection has been established successfully.')
}
catch (error) {
	console.error('Unable to connect to the database: ', error)
}


module.exports = connection;
