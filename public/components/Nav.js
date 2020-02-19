import BaseComponent from './BaseComponent.js'

export default class Nav extends BaseComponent {
    constructor(opts={}) {
        super(opts)
        this._checkOpts(['links'])

        /* check link has name and href */
        this.show()
    }
    show() {
        let html = `<div class='links'>`
        for(let link of this.opts.links) {
            html += `<a href='${link.href}'>${link.name}</a>`
        }
        html += `</div>`
        this.root.innerHTML = html
    }
}