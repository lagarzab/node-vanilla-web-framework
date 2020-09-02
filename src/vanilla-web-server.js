const http = require('http')

function server () {
    let routeTable = {}
    const svr = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('Hello World!')
    })

    return {
        listen: (port, cb) => svr.listen(port, cb),
        get: (path, cb) => addRoute(path, 'get', cb),
        post: (path, cb) => addRoute(path, 'post', cb),
        put: (path, cb) => addRoute(path, 'put', cb),
        delete: (path, cb) => addRoute(path, 'delete', cb)
    }

    function addRoute(path, method, cb) {
        if (!routeTable[path]) routeTable[path] = {}
        routeTable[path][method] = cb
    }
}

module.exports = server
