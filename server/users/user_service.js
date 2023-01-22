import { deleteUserById, findUserById, findUsers, insertUser, updateUser } from "./users_repository.js";

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

function listUsers() {
    return findUsers()
}

function getUserById(id) {
    return findUserById(id)
}

function createUser(user) {
    user.id = 0
    if (!validateUser(user)) {
        return false
    }
    return insertUser(user)
}

function editUser(user) {
    if (!validateUser(user)) {
        return false
    }
    return updateUser(user)
}


function deleteUser(id) {
    return deleteUserById(id)
}



export { listUsers, createUser, getUserById, editUser, deleteUser }