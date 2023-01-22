import http from 'http'
import Middleware from './core/middleware.js'


http.createServer((req, res) => { Middleware(req, res) }).listen(8080)