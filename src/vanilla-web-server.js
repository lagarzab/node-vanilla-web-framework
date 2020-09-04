const http = require('http')
const parseRoute = require('./utils/url-regex')
const parseQuery = require('./utils/query-regex')

function server () {
    let routeTable = {}
    const svr = http.createServer(async (req, res) => {
        let foundRoute = false

        // we have to determine if the url received, is in our route table
        // as well as, whether we have a matching method
        // if so, execute the callback in the route table object for that method of the matching path
        // else, return 404

        res = addResponseHelpers(res)
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
                req.body = await getRequestBody(req)
                
                // this is probably not the best way to handle middleware... but it's working - will refactor another time.
                if (routeTable[route][reqMethod + '-middleware']) routeTable[route][reqMethod + '-middleware'](req, res)
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
        get: (path, func1, func2) => addRoute(path, 'get', func1, func2),
        post: (path, func1, func2) => addRoute(path, 'post', func1, func2),
        put: (path, func1, func2) => addRoute(path, 'put', func1, func2),
        delete: (path, func1, func2) => addRoute(path, 'delete', func1, func2)
    }

    function addRoute(path, method, func1, func2) {
        if (!routeTable[path]) routeTable[path] = {}
        if (func2 === undefined) routeTable[path][method] = func1
        else {
            routeTable[path][method + '-middleware'] = func1
            routeTable[path][method] = func2
        }
    }

    function getRequestBody (req) {
        return new Promise ((resolve, reject) => {
            let body = ''
            req.on('data', chunk => body += chunk)
            req.on('error', err => reject(err))
            req.on('end', () => resolve(body))
        })
    }

    function addResponseHelpers (res) {
        res.send = message => res.end(message)
        res.json = message => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(message))
        }
        res.html = message => {
            res.setHeader('Content-Type', 'text/html')
            res.end(message)
        }
        return res
    }
}

module.exports = server
