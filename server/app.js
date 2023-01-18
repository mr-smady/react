import http from 'http'
import fs from 'fs'

//GET 
function getUsers(res) {
    const users = fs.readFileSync('./users.json')
    res.writeHead(200, 'OK', {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
    res.write(users)
}

//GET 1
//POST // create 201
//PUT // update or create 200
//PATCH // update field 200
//DELERE delete record 200

http.createServer((req, res) => {
    if (req.url === '/users') {
        console.log(req.headers)
        getUsers(res)
    } else {
        res.write('{}')
    }
    res.end()
}).listen(8080)