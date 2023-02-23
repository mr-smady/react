import fs from 'fs'
import { getBasicAuthorization, getReqBodyJson, httpBadRequest, httpCreate, httpOk, httpUnauthorized, jwtKey, noContent } from "../core/http_util.js"
import { createUser, editUser, getAllUsers, getUserById, removeUser } from "./user_service.js"
import jwt from 'jsonwebtoken'


function postLogin(req, res) {
    const credentials = getBasicAuthorization(req)
    if (credentials && credentials.username === 'user'
        && credentials.password === 'P@ssw0rd') {
        var token = jwt.sign({
            user: 'user',
            sub: 1234,
            roles: ['user'],
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60),//1H
        }, jwtKey)
        httpOk(res, { jwt: token })
    } else if (credentials && credentials.username === 'admin'
        && credentials.password === 'P@ssw0rd') {
        var token = jwt.sign({
            user: 'admin',
            sub: 1234,
            roles: ['admin'],
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60),//1H
        }, jwtKey)
        httpOk(res, { jwt: token })
    } else {
        httpUnauthorized(res)
    }
}

function getUsers(req, res) {
    const users = getAllUsers()
    if (users) {
        httpOk(res, users)
    } else {
        noContent(res)
    }
}

function getUser(req, res) {
    // /users/1
    const strUserId = req.url.substring('/users/'.length)
    const userId = parseInt(strUserId, 10)
    if (userId) {
        const user = getUserById(userId)
        if (user) {
            httpOk(res, user)
        } else {
            httpBadRequest(res, { message: 'user not found', userId: userId })
        }
    } else {
        httpBadRequest(res, { message: 'bad user id', userId: userId })
    }
}

function postUsers(req, res) {
    getReqBodyJson(req).then(
        user => {
            const originUser = { ...user }
            if (createUser(user)) {
                httpCreate(res, user)
            } else {
                httpBadRequest(res, { message: 'bad user structure', user: originUser })
            }
        },
        error => {
            httpBadRequest(res, { message: error })
        })
}

function putUsers(req, res) {
    getReqBodyJson(req).then(
        user => {
            const originUser = { ...user }
            if (editUser(user)) {
                httpOk(res, user)
            } else {
                httpBadRequest(res, { message: 'bad user structure', user: originUser })
            }
        },
        error => {
            httpBadRequest(res, { message: error })
        })
}


function deleteUser(req, res) {
    const strUserId = req.url.substring('/users/'.length)
    const userId = parseInt(strUserId, 10)
    if (userId) {
        const user = removeUser(userId)
        if (user) {
            httpOk(res, user)
        } else {
            httpBadRequest(res, { message: 'user not found', userId: userId })
        }
    } else {
        httpBadRequest(res, { message: 'bad user id', userId: userId })
    }
}

export { getUsers, getUser, postUsers, putUsers, deleteUser, postLogin }