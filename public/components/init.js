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
    
    let img = document.getElementsByClassName('image-0')[0]
    let info = document.getElementsByClassName('info')[0]

    const loader = async (img) => {
        let e, s = Date.now()
        img.src = 'loading.gif'
        let res = await fetch('control/image')
        res = await res.json()
        console.log(res)
        img.src = `${res.message}`
        e = Date.now()
        info.textContent = `${res.message}, ${e-s}ms`

    }

    img.onclick = async (e) => {
        await loader(e.target)
    }
    await loader(img)

}