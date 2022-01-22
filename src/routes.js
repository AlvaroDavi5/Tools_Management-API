const index = require("./index")
const users = require("./users.js")
const tools = require("./tools.js")


module.exports = function(app){

	// sample:
	// http://localhost:3000/user/:user_id/tool/:tool_id?token=XXXXXXXX&return_id=true

	// --- users ---
	app.post("/user/auth", users.userAuth) // authenticate user with JSON body and return id and token
	app.post("/user", users.userCreate) // create user with JSON body and return id
	app.get("/user/:user_id", users.userRead) // return user public data by token
	app.put("/user/:user_id", users.userUpdate) // update user data with JSON body by token
	app.delete("/user/:user_id", users.userDelete) // delete user with JSON body by token

	// --- tools ---
	app.get("/tools", tools.toolReadAll) // get all tools, get tools filtered by tag
	app.get("/user/:user_id/tools", tools.toolReadAll) // get tools by user id, get tools filtered by tag
	app.post("/user/:user_id/tool", tools.toolCreate) // create tool with JSON body by token and return id
	app.get("/user/:user_id/tool/:tool_id", tools.toolRead) // get tool by id and token
	app.put("/user/:user_id/tool/:tool_id", tools.toolUpdate) // update tool by id and token
	app.delete("/user/:user_id/tool/:tool_id", tools.toolDelete) // delete tool by id and token

	// --- index ---
	app.get("/", index.info) // return index data (API info)
}
