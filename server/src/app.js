const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

var Post = require("../models/post");

app.get('/latest', (req, res) => {
  Post.find({"date.utc":"2018-07-28T10:00:00.000Z","parameter":"pm25","country":"US","coordinates.latitude":{$exists:true}},"country city date.utc coordinates value parameter", function (error, po) {
	  if (error) { console.error(error); }
	  res.send({
			post: po
		})
	}).sort({_id:-1})
})

app.listen(process.env.PORT || 8081)
