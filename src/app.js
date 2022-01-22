const express = require('express')
const bodyParser = require('body-parser')
const routes = require("./routes.js")


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

if (routes(app)) {
	console.log("routes loaded")
}

app.listen(3000)
