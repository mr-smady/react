import { deleteUser, getUser, getUsers, postLogin, postUsers, putUsers } from "../users/user_controller.js";
import { getBearerAuthorization, httpPageNotFound, httpUnauthorized, jwtKey } from './http_util.js'
import jwt from 'jsonwebtoken'

function isLoggedIn(req) {
    const token = getBearerAuthorization(req)
    if (token) {
        try {
            jwt.verify(token, jwtKey)
            return true
        } catch (err) {
        }
    }
    return false
}

export default function Middleware(req, res) {
    console.log('------------------------------------------')
    console.log(req.method)
    console.log(req.headers);
    const url = req.url;
    const method = req.method.toUpperCase()

    //check JWT token, valid

    if (method === 'OPTIONS') {
        res.writeHead(204, 'No Content', {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': `${req.headers['access-control-request-method']}, GET, OPTIONS`,
            'Access-Control-Allow-Headers': `X-PINGOTHER, ${req.headers['access-control-request-headers']}`,
        })
        res.end()
    } else if ((url === '/login' || url === '/login/') && method === 'POST') {
        postLogin(req, res)
    } else if ((url === '/users' || url === '/users/') && method === 'GET') {
        getUsers(req, res)
    } else if (url.startsWith('/users/') && method === 'GET') {
        getUser(req, res)
    } else if ((url === '/users' || url === '/users/') && method === 'POST') {
        if (isLoggedIn(req)) {
            postUsers(req, res)
        } else {
            httpUnauthorized(res)
        }
    } else if ((url === '/users' || url === '/users/') && method === 'PUT') {
        if (isLoggedIn(req)) {
            putUsers(req, res)
        } else {
            httpUnauthorized(res)
        }
    } else if (url.startsWith('/users/') && method === 'DELETE') {
        if (isLoggedIn(req)) {
            deleteUser(req, res)
        } else {
            httpUnauthorized(res)
        }
    } else {
        httpPageNotFound(res)
    }
}