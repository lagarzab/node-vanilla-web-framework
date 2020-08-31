const http = require('http')

function server () {
    const svr = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('Hello World!')
    })

    return {
        listen: (port, cb) => svr.listen(port, cb)
    }
}

module.exports = server
