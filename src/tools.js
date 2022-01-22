const encryptPass = require("../services/encryptPass.js")
const userController = require("../services/userController.js")
const toolController = require("../services/toolController.js")


exports.toolCreate = async function(request, response) {
	const { method, query, params, body } = request

	try {
		let user = null
		const decodedToken = encryptPass.decodeToken(query.token)
		if (params.tool_id == decodedToken.decoded.tool_id) {
			user = await userController.getUserById(params.user_id)
		}
		const tool_id = await toolController.createTool(user.id, body.title, body.link, body.description, body.tags, true)

		response.status(201) // Created
		response.send({
			success: !!tool_id,
			method: method,
			data: {
				tool_id: tool_id
			},
			message: !!tool_id ? "Tool created successfully" : "Error to create tool"
		})
	}
	catch ({ message }) {
		response.status(401) // Unauthorized
		response.send({
			success: false,
			method: method,
			data: null,
			message: message
		})
	}
}

exports.toolRead = async function(request, response) {
	const { method, query, params } = request

	try {
		let user = null
		const decodedToken = encryptPass.decodeToken(query.token)
		if (params.user_id == decodedToken.decoded.user_id) {
			user = await userController.getUserById(params.user_id)
		}
		const tool = await toolController.getToolById(params.tool_id)

		response.status(200) // OK
		response.send({
			success: !!tool,
			method: method,
			data: tool,
			message: !!tool ? "Tool finded successfully" : "Tool not found"
		})
	}
	catch ({ message }) {
		response.status(401) // Unauthorized
		response.send({
			success: false,
			method: method,
			data: null,
			message: message
		})
	}
}

exports.toolReadAll = async function(request, response) {
	const { method, query } = request

	try {
		const allTools = await toolController.getAllTools()
		let tools = allTools
		if (!!query.user_id) {
			tools = tools.filter(tool => tool.user_id == query.user_id)
		}
		if (!!query.tag) {
			tools = tools.filter(tool => tool.tags.includes(query.tag))
		}

		response.status(200) // OK
		response.send({
			success: !!tools,
			method: method,
			data: tools,
			message: !!tools ? "Tools finded successfully" : "Tools not found"
		})
	}
	catch ({ message }) {
		response.status(401) // Unauthorized
		response.send({
			success: false,
			method: method,
			data: null,
			message: message
		})
	}
}

exports.toolUpdate = async function(request, response) {
	const { method, query, params, body } = request

	try {
		let user = null
		const decodedToken = encryptPass.decodeToken(query.token)
		if (params.user_id == decodedToken.decoded.user_id) {
			user = await userController.getUserById(params.user_id)
		}
		let tool = null
		let wasUpdated = false
		if (!!user) {
			tool = await toolController.getToolById(params.tool_id)
			wasUpdated = await toolController.updateTool(tool, body.title, body.link, body.description, body.tags)
		}

		response.status(200) // OK
		response.send({
			success: !!wasUpdated,
			method: method,
			data: wasUpdated,
			message: !!wasUpdated ? "Tool updated successfully" : "Error to update tool"
		})
	}
	catch ({ message }) {
		response.status(401) // Unauthorized
		response.send({
			success: false,
			method: method,
			data: null,
			message: message
		})
	}
}

exports.toolDelete = async function(request, response) {
	const { method, query, params } = request

	try {
		let user = null
		const decodedToken = encryptPass.decodeToken(query.token)
		if (params.user_id == decodedToken.decoded.user_id) {
			user = await userController.getUserById(params.user_id)
		}
		let tool = null
		let wasDeleted = false
		if (!!user) {
			tool = await toolController.getToolById(params.tool_id)
			wasDeleted = await toolController.deleteTool(tool)
		}

		response.status(200) // OK
		response.send({
			success: !!wasDeleted,
			method: method,
			data: wasDeleted,
			message: !!wasDeleted ? "Tool deleted successfully" : "Error to delete tool"
		})
	}
	catch ({ message }) {
		response.status(401) // Unauthorized
		response.send({
			success: false,
			method: method,
			data: null,
			message: message
		})
	}
}
