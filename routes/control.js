module.exports = (opts={}) => {
    const express = require('express')
    const router = express.Router()
    const {execSync} = require('child_process')

    router.use(express.json())

    router.post('/garage', (req, res, next) => {
        let pin = req.body.pin

        if(!pin) throw Error('no pin defined in body')

        let run = execSync(`${opts.command} ${pin}`)

        /* run external application */
        res.send({
            status: 200, 
            message: `${run}`
        })
    })

    return router
}