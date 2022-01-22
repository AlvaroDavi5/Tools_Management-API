const encryptPass = require("./encryptPass.js")
const connection = require("../database/connection.js")
const Users = require("../database/models/users.js")


/*
 * CRUD database operations
  ? Create
  ? Read
  ? Update
  ? Delete
*/
async function createUser(name, email, password, phone, cpf, uf, return_id) {
	Users.init(connection)
	const pass = await encryptPass.hashValue(password)

	try {
		const user = await Users.create(
			{
				name: name,
				email: email,
				password: pass,
				phone: phone,
				cpf: cpf,
				uf: uf
			}
		)

		if (return_id == true) {
			return user.id
		}
		else {
			return true
		}
	}
	catch ({ message }) {
		return false
	}
}

async function getUserById(id) {
	Users.init(connection)

	try {
		const user = await Users.scope('withoutSensibleData').findByPk(id)

		return user
	}
	catch ({ message }) {
		return null
	}
}

async function getAllUsers() {
	Users.init(connection)

	try {
		const users = await Users.scope('withoutSensibleData').findAll()

		return users
	}
	catch ({ message }) {
		return null
	}
}

async function searchUser(email) {
	Users.init(connection)

	try {
		const user = await Users.findOne({
			where: {
				email: email
			}
		})

		return !!user
	}
	catch ({ message }) {
		return false
	}
}

async function getUserIdByToken(token) {
	const userToken = encryptPass.decodeToken(token).decoded

	return parseInt(userToken.user_id)
}

async function getUserByCredentials(email, password) {
	Users.init(connection)

	try {
		const user = await Users.findOne({
			where: {
				email: email,
				password: encryptPass.hashValue(password)
			}
		})

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			cpf: user.cpf,
			uf: user.uf
		}
	}
	catch ({ message }) {
		return null
	}
}

async function updateUser(user, name, email, password, phone, cpf, uf) {
	Users.init(connection)

	try {
		if (name) { user.name = name }
		if (email) { user.email = email }
		if (password) { user.password = encryptPass.hashValue(password) }
		if (phone) { user.phone = phone }
		if (cpf) { user.cpf = cpf }
		if (uf) { user.uf = uf }

		await user.save()

		return true
	}
	catch ({ message }) {
		return false
	}
}

async function deleteUser(user) {
	Users.init(connection)

	try {
		await user.destroy()

		return true
	}
	catch ({ message }) {
		return false
	}
}


module.exports = { createUser, getUserById, getAllUsers, searchUser, getUserIdByToken, getUserByCredentials, updateUser, deleteUser }
