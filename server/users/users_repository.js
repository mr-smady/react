import fs from 'fs'

const FILE = './users/data/users.json'

function findUsers() {
    return users
}

function findUserById(id) {
    return users.find(u => u.id === id)
}

function deleteUserById(id) {
    const userIndex = users.findIndex(u => u.id === id)
    if (userIndex === -1) {
        return false
    }
    users.splice(userIndex, 1)
    fs.writeFileSync(FILE, JSON.stringify(users))
    return true
}

function insertUser(user) {
    if (users.find(u => u.id === user.id)) {
        return false
    }
    user.id = Math.max(...users.map(u => u.id)) + 1
    users.push(user)
    fs.writeFileSync(FILE, JSON.stringify(users))
    return true
}

function updateUser(user) {
    const userIndex = users.findIndex(u => u.id === user.id)
    if (userIndex === -1) {
        return false
    }
    users[userIndex] = user
    fs.writeFileSync(FILE, JSON.stringify(users))
    return true
}

const users = JSON.parse(fs.readFileSync(FILE))

export { findUsers, insertUser, findUserById, updateUser, deleteUserById }