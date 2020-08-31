const vanilla = require('./src/vanilla-web-server')
const server = vanilla()
const PORT = 3333

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`)
})
