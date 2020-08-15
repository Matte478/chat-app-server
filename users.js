const users = []

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()

  if (!name || !room)
    return {
      error: 'Username and room are required.',
    }

  const userExists = users.find(
    (user) => user.name === name && user.room === room,
  )

  if (userExists)
    return {
      error: 'Username is taken.',
    }

  const user = {
    id: id,
    name: name,
    room: room,
  }

  users.push(user)

  return { user }
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

const getUser = (id) => {
  return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room)
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom }
