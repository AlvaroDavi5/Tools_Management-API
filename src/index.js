
exports.info = function(request, response) {
	const { url, path, protocol, method, query, params, body } = request

	try {
		response.status(200) // OK
		response.send({
			success: true,
			message: "Connected to API successfully",
			requestData: {
				url: url,
				path: path,
				protocol: protocol,
				method: method,
				status_code: 200,
				query: query,
				params: params,
				body: body
			}
		})
	}
	catch ({ message }) {
		response.status(500) // Internal Server Error
		response.send({
			success: false,
			message: message
		})
	}
}
