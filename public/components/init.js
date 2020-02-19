import Nav from './Nav.js'
import GarageButton from './GarageButton.js'

/* add JS to dom elements  */
window.onload = async () => {
    let config /* loaded file from server */
    /* fetch the config  */
    try {
        let res = await fetch('/config')
        res = await res.json()
        console.log(res)
        config = res
    }catch(e) {
        alert(JSON.stringify(e, null, 2))
    }

    let nav = new Nav({
        class: 'nav',
        links: []
    })

    let rightButton = new GarageButton({
        class: 'button-1',
        post: 'control/garage',
        payload: config['button-1']
    })

    let leftButton = new GarageButton({
        class: 'button-0',
        post: 'control/garage',
        payload: config['button-0']
    })
}