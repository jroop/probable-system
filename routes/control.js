const {exec} = require('child_process')

const promExec = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if(err) reject(err)
            if(stderr) reject(stderr)
            resolve(stdout)
        })
    })
}

module.exports = (opts={}) => {
    const express = require('express')
    const router = express.Router()

    router.use(express.json())

    router.post('/garage', async (req, res, next) => {
        let pin = req.body.pin

        if(!pin) throw Error('no pin defined in body')

        try {
            let run = await promExec(`${opts.command} ${pin}`)
            /* run external application */
            res.send({
                status: 200, 
                message: `${run}`
            })
        }catch(err) {
            return next(err)
        }
    })

    router.get('/image', async (req, res, next) => {
        try {
            let d = Date.now()
            await promExec(`${opts.delete}`)
            await promExec(`${opts.image}${d}.jpg`)
            let e = Date.now()
            res.send({
                status: 200,
                message: `${d}.jpg`,
                time: e-d
            })
        }catch(err) {
            return next(err)
        }
    })

    return router
}