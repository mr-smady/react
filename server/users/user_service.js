import { insertUser, selectAllUsers, selectUserById, updateUser, deleteUser } from "./users_repository.js"

const UserInterface = {
    id: "number",
    username: "string",
    name: "string",
    email: "email",
};

const validateEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    .test(email)

const validateUser = (user) => {
    for (const [key, value] of Object.entries(UserInterface)) {
        if (typeof user?.[key] !== value) {
            if (value !== 'email' || !validateEmail(user?.[key])) {
                return false
            }
        }
    }
    return true
}

function getAllUsers() {
    return selectAllUsers()
}


function getUserById(userId) {
    return selectUserById(userId)
}

function createUser(user) {
    user.id = 0
    if (validateUser(user)) {
        return insertUser(user)
    } else {
        return false
    }
}

function editUser(user) {
    if (validateUser(user)) {
        return updateUser(user)
    } else {
        return false
    }
}

function removeUser(userId) {
    return deleteUser(userId)
}

export { getAllUsers, getUserById, createUser, editUser, removeUser }