const express = require('express')
const app = new express()

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html')
})

app.get('/client.js', function(req,res) {
	res.sendFile(__dirname + '/public/client.js')
})

app.get('/favicon.png', function(req, res) {
	res.sendFile(__dirname + '/public/favicon.png')
})

app.get('/docs', function(req, res) {
	res.sendFile(__dirname + '/public/docs.html')
})

app.listen(8080)