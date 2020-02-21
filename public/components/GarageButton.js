import BaseComponent from './BaseComponent.js'

export default class GarageButton extends BaseComponent {
    constructor(opts={}) {
        super(opts)

        this.opts = opts

        this.cbs = []

        this.root.onclick = async (e) => {
            e.target.disabled = true
            try{
                let res = await fetch(opts.post, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(opts.payload)
                })
                res = await res.json()
                alert(JSON.stringify(res, null, 2))
            
            }catch(e) {
                alert(JSON.stringify(e, null, 2))
            }
            for(let f of this.cbs) {
                f(this)
            }
            e.target.disabled = false

        }

        this.show()
    }
    show() {
        this.root.textContent = `${this.opts.payload.message} (${this.opts.payload.pin})`
    }
    addClickCb(f) {
        this.cbs.push(f)
    }
}