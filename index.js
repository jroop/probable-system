const path = require('path')
const express = require('express')
const app = express()
const server = require('http').Server(app)

/* middleware  */
const index = require('./routes/index')
const control = require('./routes/control')
const config = require('./public/config.json')

/* setup info */
let setup = {
    PORT: process.env.PORT || 80,
    views: path.join(__dirname, 'public/views'),
    components: path.join(__dirname, 'public/components'),
    public: path.join(__dirname, 'public'),
    images: '/mnt/zbox/pi/images'
}
console.log(setup)
console.log(config)

const errHandler = (err, req, res, next) => {
    /* general error handling  */
    res.send({
        status: 500,
        message: `${err}`
    })
}

/* express setup */
app.set('json spaces', 2)

app.use('/', index({
    views: setup.views,
    public: setup.public
}), errHandler)
app.use('/control', control({
    command: config.command,
    image: config.image,
    delete: config.delete
}), errHandler)

app.use(express.static(setup.components))
app.use(express.static(setup.public))
app.use(express.static(setup.images))

server.listen(setup.PORT, '0.0.0.0', () => {
    console.log(`server started on port: ${setup.PORT}`)
})