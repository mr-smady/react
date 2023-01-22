import { getReqBodyJson, httpClientError, httpCreate, httpOk, noContent } from "../core/http_util.js";
import { createUser, getUserById, listUsers, editUser, deleteUser } from "./user_service.js";

function getUsers(req, res) {
    httpOk(res, listUsers())
}

function getUser(req, res) {
    const userIdStr = req.url.substring('/users/'.length)
    const userId = parseInt(userIdStr, 10)
    if (userId) {
        const user = getUserById(userId)
        if (user) {
            httpOk(res, user)
        } else {
            httpClientError(res, { 'message': 'user not found', 'userId': userIdStr });
        }
    } else {
        httpClientError(res, { 'message': 'Invalid user id', 'userId': userIdStr });
    }
}

function removeUser(req, res) {
    const userIdStr = req.url.substring('/users/'.length)
    const userId = parseInt(userIdStr, 10)
    if (userId) {
        if (deleteUser(userId)) {
            noContent(res)
        } else {
            httpClientError(res, { 'message': 'user not found', 'userId': userIdStr });
        }
    } else {
        httpClientError(res, { 'message': 'Invalid user id', 'userId': userIdStr });
    }
}

function postUser(req, res) {
    getReqBodyJson(req).then(
        user => {
            if (createUser(user)) {
                httpCreate(res, user)
            } else {
                httpClientError(res, { 'message': 'invalide user', 'user': user })
            }
        },
        error => { httpClientError(res, { 'error': error }) });
}


function putUser(req, res) {
    getReqBodyJson(req).then(
        user => {
            if (editUser(user)) {
                httpOk(res, user)
            } else {
                httpClientError(res, { 'message': 'invalide user', 'user': user })
            }
        },
        error => { httpClientError(res, { 'error': error }) });
}

export { getUsers, getUser, postUser, putUser, removeUser }