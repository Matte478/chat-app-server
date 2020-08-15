const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const port = 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(router)

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room)

    const { error, user } = addUser({
      id: socket.id,
      name: name,
      room: room,
    })

    console.log('error:' + error)
    console.log('user:', user)

    if (error) return callback(error)

    socket.join(user.room)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
