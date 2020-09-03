const http = require('http')
const parseRoute = require('./utils/url-regex')
const parseQuery = require('./utils/query-regex')

function server () {
    let routeTable = {}
    const svr = http.createServer((req, res) => {
        let foundRoute = false

        // we have to determine if the url received, is in our route table
        // as well as, whether we have a matching method
        // if so, execute the callback in the route table object for that method of the matching path
        // else, return 404
        req.query = req.url.indexOf('?') > -1 ? parseQuery(req.url) : {}
        let [ reqUrl ] = req.url.split('?')
        let reqMethod = req.method.toLowerCase()
        let routes = Object.keys(routeTable)
        for (let i = 0; i < routes.length; i++) {
            let route = routes[i]
            let parsedRoute = parseRoute(route)
            if (new RegExp(parsedRoute).test(reqUrl) && !!routeTable[route][reqMethod]) {
                foundRoute = true
                req.params = reqUrl.match(new RegExp(parsedRoute)).groups
                routeTable[route][reqMethod](req, res)
                /*
                because we could potentially find routes with the same format, 
                we should allow all routes to be evaluated. Express does this same thing.
                */
                // break
            }
        }
        if (!foundRoute) {
            res.statusCode = 404
            res.end('Not found')
        }
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
