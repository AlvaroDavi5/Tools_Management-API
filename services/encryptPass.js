import { SHA256, AES } from 'crypto-js'
import jwt from 'jsonwebtoken'
const dotenv = require('dotenv')


function hashValue(value) {

	const hashCode = SHA256(value)
	const hash = hashCode.toString()

	return hash
}

function encryptPass(user_id) {

	const cypher = AES.encrypt(`${user_id}`, process.env.CRYPTO_KEY)
	AES.decrypt(cypher, process.env.CRYPTO_KEY)
	const encriptedPass = cypher.toString()

	return encriptedPass
}

function decryptPass(cypher) {

	const decypher = AES.decrypt(cypher, process.env.CRYPTO_KEY)
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

export { hashValue, encryptPass, decryptPass, generateToken, decodeToken }
