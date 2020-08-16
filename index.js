const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const port = 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())
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

    if (error) return callback(error)

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`,
    })

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name}, has joined!` })

    socket.join(user.room)

    if (callback) callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('message', { user: user.name, text: message })

    if (callback) callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if(user) {
      io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`})
    }
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
