const queryParser = require('../src/utils/query-regex')

assert('url should be parsed and return only 1 query param')
    .test('/path?name=test')
    .expect({name: 'test'})
assert('url should be parsed and return 2 query params')
    .test('/path?name=test&type=1')
    .expect({name: 'test', type: '1'})
assert('3 very long query params params')
    .test('/path?firstName=thisIsMySuperLongFirstName&lastName=thisIsMyPrettyLongLastName&age=123')
    .expect({
        firstName: 'thisIsMySuperLongFirstName',
        age: '123',
        lastName: 'thisIsMyPrettyLongLastName'
    })
assert('no query string "/path" passed, should result in empty object')
    .test('/path')
    .expect({})
assert('no query string "/path?" passed, should result in empty object')
    .test('/path?')
    .expect({})
assert('invalid query "/path?&" passed, should result in empty object')
    .test('/path?&')
    .expect({})
assert('query string passed w/extra ampersand "/path?value=123&", should parse without issue')
    .test('/path?value=123&')
    .expect({value:'123'})
assert('query string containing whitespace at end, should parse without issue')
    .test('/path?value=123   ')
    .expect({value:'123'})
assert('key passed with no value, allowed')
    .test('/path?value')
    .expect({value:''})
assert('key passed with no value, allowed')
    .test('/path?value=')
    .expect({value:''})
assert('query string w/mixed keys where some have values and some don\'t, should parse cleanly')
    .test('/path?value&name&somethingElse=123&')
    .expect({value:'', name: '', somethingElse: '123'})

assert('query string w/encoded spaces "+", should contain spaces')
    .test('/path?value=++test++')
    .expect({value:'  test  '})
assert('query string w/encoded spaces as "%20", should contain spaces')
    .test('/path?value=%20%20test%20%20')
    .expect({value:'  test  '})

function assert(assertion) {
    return {
        assert: assertion,
        route: null,
        routeFormat: null,
        result: null,
        expect: function (expected) {
            const status = checkObectEquality(this.result, expected)
            const msg = status ? 'Passed' : 'FAILED'
            const color = status ? '\x1b[32m%s\x1b[0m' : '\x1b[41m%s\x1b[0m'
            console.log('\x1b[36m%s\x1b[0m', this.assert)
            console.log('Expected:', expected, '| Result:', this.result)
            console.log(color, msg, ':', this.route, ' ==> ', this.result)
            return this
        },
        test: function (route, routeFormat) {
            this.route = route
            const queryString = queryParser(route)
            this.result = queryString // route.match(new RegExp(regex))
            return this
        }
    }
}

function checkObectEquality (objA, objB) {
    let keysA = Object.keys(objA)
    let keysB = Object.keys(objB)
    if (keysA.length !== keysB.length) return false
    for (let i = 0; i < keysA.length; i++) {
        let name = keysA[i]

        if (objB[name] === undefined || objA[name] !== objB[name]) {
            return false
        }
    }

    return true
}