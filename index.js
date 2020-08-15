const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const port = 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
