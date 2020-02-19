export default class BaseComponent {
    constructor(opts={}) {
        this.opts = opts
        this._checkOpts(['class'])
        this.root = document.getElementsByClassName(opts.class)[0]
        if(!this.root) throw new Error(`no element class ${opts.class}`)
    }
    _checkOpts(keys=[]) {
        for(let k of keys) {
            if(!this.opts.hasOwnProperty(k)) throw Error(`key "${k}" not found`)
        }
    }
    update(opts={}) {
        for(let k of opts) {
            if(this.opts.hasOwnProperty(k)) this[k] = opts[k]
        }
    }
    show() {}
}