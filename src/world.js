import _Vector2D from "./vector.js"

class _World {
    time = 0
    gravity = 0
    dimension = {
        width: 5000,
        height: 5000
    }
}

class _Viewport {
    view = null
    dimension = {
        width: 900,
        height: 700,
    }
    #cursor = {
        position: new _Vector2D
    }
    
    constructor() {
        this.view = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.view.setAttribute('style', 'background: gray')
        this.view.setAttribute('width', this.dimension.width)
        this.view.setAttribute('height', this.dimension.height)

        document.body.setAttribute('style', 'display: flex; justify-content: center; align-items: center; height: 100vh; width: 100vw; overflow: hidden')
        document.body.appendChild(this.view)

        // keep track of the mouse cursor position
        document.addEventListener('mousemove', e => {
            const pos = this.view.getBoundingClientRect()
            this.#cursor.position.x = e.pageX - pos.left
            this.#cursor.position.y = e.pageY - pos.top
        })
    }

    GetCursor() {
        return this.#cursor
    }
}

class _Events {
    #keypressed = {}

    constructor() {
        // keeps tracks of which keys are pressed or not
        document.addEventListener('keydown', e => !this.#keypressed[e.key.toLowerCase()] ? this.#keypressed[e.key.toLowerCase()] = true : null)
        document.addEventListener('keyup', e => delete this.#keypressed[e.key.toLowerCase()])
    }

    OnBeforeWorldUpdate() {}

    OnWorldUpdate() {}

    OnKeyPressed(key) {
        return this.#keypressed[key.toLowerCase()] || false
    }
}

let World = new _World
let Viewport = new _Viewport
let Events = new _Events

export {
    World,
    Viewport,
    Events,
}