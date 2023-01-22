function response(res, status, statusMessage, data) {
    res.writeHead(status, statusMessage, {
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

function httpClientError(res, data) {
    response(res, 400, 'Bad Request', data)
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
                console.log(data);
                resolve(data);
            });
        } catch (error) {
            reject(error);
        }
    });
}


export { getReqBodyJson, response, httpOk, httpCreate, httpClientError, noContent }