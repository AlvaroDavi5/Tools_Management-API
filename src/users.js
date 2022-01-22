const encryptPass = require("../services/encryptPass.js")
const userController = require("../services/userController.js")


exports.userAuth = async function(request, response) {
	const { method, body } = request

	try {
		const user = await userController.getUserByCredentials(body.email, body.password)
		const token = encryptPass.generateToken(user.id, user.email)

		response.status(200) // OK
		response.send({
			success: !!user,
			method: method,
			data: {
				user_id: user.id,
				token: token
			},
			message: !!user ? "User authenticated successfully" : "Error to authenticate user"
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

exports.userCreate = async function(request, response) {
	const { method, body } = request

	try {
		const userAlreadyExists = await userController.searchUser(body.email)

		let user_id = null
		if (!userAlreadyExists) {
			user_id = await userController.createUser(body.name, body.email, body.password, body.phone, body.cpf, body.uf, true)
		}

		response.status(201) // Created
		response.send({
			success: !!user_id,
			method: method,
			data: {
				user_id: user_id
			},
			message: !!user_id ? "User created successfully" : "Error to create user"
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

exports.userRead = async function(request, response) {
	const { method, query, params } = request

	try {
		let user = null
		const decodedToken = encryptPass.decodeToken(query.token)
		if (params.user_id == decodedToken.decoded.user_id) {
			user = await userController.getUserById(params.user_id)
		}

		response.status(200) // OK
		response.send({
			success: !!user,
			method: method,
			data: user,
			message: !!user ? "User finded successfully" : "User not found"
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

exports.userUpdate = async function(request, response) {
	const { method, query, params, body } = request

	try {
		let user = null
		const decodedToken = encryptPass.decodeToken(query.token)
		if (params.user_id == decodedToken.decoded.user_id) {
			user = await userController.getUserById(params.user_id)
		}
		const wasUpdated = await userController.updateUser(user, body.name, body.email, body.password, body.phone, body.cpf, body.uf)

		response.status(200) // OK
		response.send({
			success: !!wasUpdated,
			method: method,
			data: {
				wasUpdated: wasUpdated
			},
			message: !!wasUpdated ? "User updated successfully" : "Error to update user"
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

exports.userDelete = async function(request, response) {
	const { method, query, params } = request

	try {
		let user = null
		const decodedToken = encryptPass.decodeToken(query.token)
		if (params.user_id == decodedToken.decoded.user_id) {
			user = await userController.getUserById(params.user_id)
		}
		const wasDeleted = await userController.deleteUser(user)

		response.status(200) // OK
		response.send({
			success: !!wasDeleted,
			method: method,
			data: {
				wasDeleted: wasDeleted
			},
			message: !!wasDeleted ? "User deleted successfully" : "Error to delete user"
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
