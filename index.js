const vanilla = require('./src/vanilla-web-server')
const server = vanilla()
const PORT = 3333

server.get('/products/:id', (req, res) => res.end('Testing the PRODUCTS/:ID route, I see'))
server.get('/route1', (req, res) => res.end('You are on the GET route1'))
server.get('/route2', (req, res) => res.end('There you are! route2 GET'))
server.put('/route1', (req, res) => res.end('PUT something here on route1'))
server.put('/route1/:id', (req, res) => res.end('You are here. PUT -> ROUTE1/:ID '))
server.delete('/route1', (req, res) => res.end('This probably wont DELETE anything on route1'))
server.post('/route2', (req, res) => res.end('Here is route2\'s POST path'))
server.get('/', (req, res) => res.end('This is the HOME run route'))
server.get('/about', (req, res) => res.end('You found the about page!'))

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`)
})
