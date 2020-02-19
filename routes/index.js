module.exports = (opts={}) => {
    const router = require('express').Router()

    router.get('/', (req, res, next) => {
        res.sendFile(`${opts.views}/index.html`)
    })

    router.get('/config',(req, res) => {
        res.sendFile(`${opts.public}/config.json`)
    })

    return router
}