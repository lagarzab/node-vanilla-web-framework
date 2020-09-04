const routeParser = require('../src/utils/url-regex')

assert('This route with one param to pass').test("/products/114", "/products/:id").expect(true)
assert('This route with two params to fail on route with one param').test("/products/114/testName", "/products/:id").expect(false)
assert('This route with two params should pass to a route expecting two params').test("/products/114/testName", "/products/:id/:name").expect(true)
assert('This route does not match, it should fail').test("/products/114/testName/any", "/products/:id/:name/another").expect(false)
assert('route with query string, should pass').test("/products/114?test=test", "/products/:id").expect(true)
assert('bad route with query string, should fail').test("/products/114/categories?test=test", "/products/:id").expect(false)
assert('bad route with query string, should fail').test("/products?test=test", "/products/:id").expect(false)

function assert(assertion) {
    return {
        assert: assertion,
        route: null,
        routeFormat: null,
        result: null,
        expect: function (expected) {
            const status = this.result === expected
            const msg = status ? 'Passed' : 'FAILED'
            const color = status ? '\x1b[32m%s\x1b[0m' : '\x1b[41m%s\x1b[0m'
            console.log('')
            console.log('\x1b[36m%s\x1b[0m', this.assert)
            console.log(`Expected: ${expected}`, `| Result: ${this.result}`)
            console.log(color, msg, ':', this.route, ' ==> ', this.routeFormat)
            return this
        },
        test: function (route, routeFormat) {
            this.route = route
            route = route.split('?')[0]
            this.routeFormat = routeFormat
            const format = '^' + routeFormat + '$'
            const regex = routeParser(format)
            this.result = !!route.match(new RegExp(regex))
            return this
        }
    }
}
