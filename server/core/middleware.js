import { getUser, getUsers, postUser, putUser, removeUser } from "../users/user_controller.js";
import { httpClientError } from "./http_util.js";


export default function Middleware(req, res) {
    console.log(req.headers);
    console.log(req.method);
    const url = req.url
    const method = req.method.toUpperCase()
    if (method === 'OPTIONS') {
        res.writeHead(204, 'No Content', {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': `${req.headers['access-control-request-method']}, GET, OPTIONS`,
            'Access-Control-Allow-Headers': `X-PINGOTHER, ${req.headers['access-control-request-headers']}`,
        })
        res.end()
    } else if (url === '/users' && method === 'GET') {
        getUsers(req, res)
    } else if (url.startsWith('/users/') && method === 'GET') {
        getUser(req, res)
    } else if (url === '/users' && method === 'POST') {
        postUser(req, res)
    } else if (url === '/users' && method === 'PUT') {
        putUser(req, res)
    } else if (url.startsWith('/users/') && method === 'DELETE') {
        removeUser(req, res)
    } else {
        httpClientError(res, { 'message': 'Invalid input or URL' });
    }
}