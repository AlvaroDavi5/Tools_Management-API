const criptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path:__dirname+"/../.env.development.local"})


function hashValue(value) {

	const hashCode = criptoJS.SHA256(value)
	const hash = hashCode.toString()

	return hash
}

function encryptPass(pass_phrase) {

	const cypher = criptoJS.AES.encrypt(`${pass_phrase}`, process.env.CRYPTO_KEY)
	AES.decrypt(cypher, process.env.CRYPTO_KEY)
	const encriptedPass = cypher.toString()

	return encriptedPass
}

function decryptPass(cypher) {

	const decypher = criptoJS.AES.decrypt(cypher, process.env.CRYPTO_KEY)
	const decryptedPass = decypher.toString()

	return decryptedPass
}

function generateToken(user_id, user_email) {
	const token = jwt.sign(
		{
			user_id: user_id,
			user_email: user_email
		},
		process.env.CRYPTO_KEY,
		{
			expiresIn: '3h'
		}
	)

	return token
}

function decodeToken(token) {
	const decoded = jwt.decode(token, process.env.CRYPTO_KEY)

	try {
		const verified = jwt.verify(token, process.env.CRYPTO_KEY)
		if (verified) {
			return {
				message: "Token verified successfully!",
				decoded: decoded
			}
		}
	}
	catch (error) {
		return {
			message: error.message,
			decoded: null
		}
	}
}

module.exports = { hashValue, encryptPass, decryptPass, generateToken, decodeToken }
