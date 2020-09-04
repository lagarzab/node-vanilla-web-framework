# vanilla-web-framework
A simple nodejs web framework built from standard node modules and vanilla javascript.

### What we expect to get running
- [x] **Routes**:

Only `get`, `post`, `put` and `delete` endpoints are implemented currently. There is vanilla assertion script created for testing these here: [./tests/route-tests.js](./tests/query-tests.js)

Routes are capable accepting route parameters by assigning a name, prepended with a colon like so: `/users/:id` In the callback for this route, you will have access to `req.param.id` which will be the value that was passed to this route. For instance, `req.param.id` will be 123, should you create an endpoint of `/users/:id` and visit that endpoint with `/users/123`.

- [x] **Middleware**: 

Middleware has been implemented however, you can only pass 1 middleware function, along with the normal callback for each route. It should be reviewed and possibly refactored in order for it to be more flexible with multiple middlewares being passed.

- [x] **Query Parameters**:

Query Parameters are working well. There is vanilla assertion script created for testing these here: [./tests/query-tests.js](./tests/query-tests.js)

Query Parameters will be found in the `req.query` object. It will either be an empty object `{}` (if no parameters were passed) or contain a list of key/value pairs that were passed via query string.

- [x] **Data in Body**:

Data is read in from the body of the request. I have done some initial testing to ensure that the data is found in the `req.body` property though, I am sure there is some more work that could be done to get this working better.

- [x] **Response Type Helpers**:

Additional helper methods were created on the `res` obj, in order to make it a bit simpler to respond with html or json.
* `res.html(message)`: Responds with a Content-Type header message of text/html. Then `res.end(message)` is called.
* `res.json(message)`: Responds with a Content-Type header message of application/json. Then `res.end(message)` is called.
* `res.send(message)`: An alias for `res.end(message)`. Doesn't do anything more than that.


## Usage
Assign the function exported from `/src/vanilla-web-server.js` to a new variable:

`const server = require(./src/vanilla-web-server.js);`

Now you can assign some routes to listen for http methods.
* GET route for /user

`server.post('/user', (req, res) => console.log(Get route for /user))`

* POST route to /user/:id

`server.post('/user/:id', (req, res) => console.log(Post route for /user ${req.params.id}))`

* Creating a route with a middleware call, is similar. You pass two sets of callbacks a arguments to the route method.

```
server.get('/user',
    (req, res) => console.log('This is called from my middleware'),
    (req, res) => console.log('This is called from the callback'))
```

> You'll notice that there is little difference with a plain route with one callback and a route with a middleware attached. The vanilla server will recognize whether you've passed in 1 or 2 callbacks and will assign the first callback (if two are found) as the middleware call. 

Now, you are ready to start the server up and listen on a port. This `server` function requires a port to be passed as the first argument and a callback as the second argument.

```
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`)
})
```

## Tests
There are a couple of different test scripts created (`./tests`) for some initial testing of parameters and routes, in order to ensure that any changes that were being made when implementing support for additional features, that it didn't break anything in the process.

These assertion tests were also created without a library and used a vanilla js approach. You can run these tests with:

`node ./tests/all-tests.js`




