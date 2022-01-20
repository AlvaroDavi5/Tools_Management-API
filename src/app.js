const express = require("express")
const bodyParser = require("body-parser")


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const routes = require("./routes.js")(app)
if (routes) {
	console.log("routes loaded")
}

app.listen(3000)
