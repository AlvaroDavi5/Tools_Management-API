const connection = require("../database/connection.js")
const Tools = require("../database/models/tools.js")


async function createTool(user_id, title, link, description, tags, return_id) {
	Tools.init(connection)

	try {
		const tool = await Tools.create(
			{
				user_id: user_id,
				title: title,
				link: link,
				description: description,
				tags: tags
			}
		)

		if (return_id == true) {
			return tool.id
		}
		else {
			return true
		}
	}
	catch ({ message }) {
		return false
	}
}

async function getToolById(id) {
	Tools.init(connection)

	try {
		const tool = await Tools.findByPk(id)

		return tool
	}
	catch ({ message }) {
		return null
	}
}

async function getAllTools() {
	Tools.init(connection)

	try {
		const tools = await Tools.findAll()

		return tools
	}
	catch ({ message }) {
		return null
	}
}

async function getToolIdByUserId(user_id) {
	Tools.init(connection)

	try {
		const tool = await Tools.findOne({
			where: {
				user_id: user_id
			}
		})

		return tool.id
	}
	catch ({ message }) {
		return null
	}
}

async function updateTool(tool, title, link, description, tags) {
	Tools.init(connection)

	try {
		if (title) { tool.title = title }
		if (link) { tool.link = link }
		if (description) { tool.description = description }
		if (tags) { tool.tags = tags }

		await tool.save()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function deleteTool(tool) {
	Tools.init(connection)

	try {
		await tool.destroy()

		return true
	}
	catch ({ message }) {
		return false
	}
}


module.exports = { createTool, getToolById, getAllTools, getToolIdByUserId, updateTool, deleteTool }
