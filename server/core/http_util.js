function getBasicAuthorization(req) {
    if (req.headers['authorization']) {
        const authorization = req.headers['authorization']
        if (authorization.startsWith('Basic ')) {
            const authBase64 = req.headers['authorization'].substring('Basic '.length)
            const auth = Buffer.from(authBase64, 'base64').toString('ascii')
            const credentials = auth.split(':')
            return {
                username: credentials[0],
                password: credentials[1],
            }
        }
    }
    return undefined
}

function getBearerAuthorization(req) {
    if (req.headers['authorization']) {
        const authorization = req.headers['authorization']
        if (authorization.startsWith('Bearer ')) {
            return req.headers['authorization'].substring('Bearer '.length)
        }
    }
    return undefined
}

function response(res, status, message, data) {
    res.writeHead(status, message, {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
    res.end(JSON.stringify(data))
}


function httpOk(res, data) {
    response(res, 200, 'OK', data)
}

function noContent(res) {
    response(res, 204, "No Content", {})
}

function httpCreate(res, data) {
    response(res, 201, 'OK', data)
}

function httpBadRequest(res, data) {
    response(res, 400, 'Bad Request', data)
}

function httpUnauthorized(res) {
    response(res, 401, 'Unauthorized')
}

function httpPageNotFound(res) {
    response(res, 404, 'Page Not Found', {})
}


function getReqBodyJson(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                const data = JSON.parse(body)
                resolve(data);
            });
        } catch (error) {
            reject(error);
        }
    });
}

const jwtKey = "myKey"

export {
    response, httpOk, noContent, httpCreate, httpBadRequest,
    httpPageNotFound, getReqBodyJson, httpUnauthorized, getBasicAuthorization, getBearerAuthorization,
    jwtKey
}