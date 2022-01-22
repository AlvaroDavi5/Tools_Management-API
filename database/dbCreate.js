const connection = require("./connection.js")
const Users = require("./models/users.js")
const Tools = require("./models/tools.js")


/* database tables creation */
Users.init(connection)
Tools.init(connection)

/* database tables associations */
/**
  * ?    Relations
  * @belongsTo - One-to-One, source -> target
  * @hasOne - One-to-One, target -> source
  * @hasMany - One-to-Many, target -> source
  * @belongsToMany - Many-to-Many, source -> target
**/
Users.associate(connection.models) // relations in each model
Tools.associate(connection.models)


module.exports = connection;
