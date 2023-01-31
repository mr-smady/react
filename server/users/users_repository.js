import fs from 'fs'

const FILE_NAME = './users/data/users.json'

function selectAllUsers() {
    return users

}


function selectUserById(userId) {
    return users.find(user => user.id === userId)
}


function insertUser(user) {
    user.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    //auto inc
    console.log(user.id)
    users.push(user)
    fs.writeFileSync(FILE_NAME, JSON.stringify(users))
    return true
}

function updateUser(user) {
    const userIndex = users.findIndex(u => user.id === u.id)
    if (userIndex === -1) {
        return false
    }
    users[userIndex] = user
    fs.writeFileSync(FILE_NAME, JSON.stringify(users))
    return true
}

function deleteUser(userId) {
    const userIndex = users.findIndex(u => u.id === userId)
    if (userIndex === -1) {
        return undefined
    }
    const user = users[userIndex]
    users.splice(userIndex, 1)
    fs.writeFileSync(FILE_NAME, JSON.stringify(users))
    return user
}

const users = JSON.parse(fs.readFileSync(FILE_NAME))

export { selectAllUsers, selectUserById, insertUser, updateUser, deleteUser }