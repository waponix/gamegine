import { PointDirection, PointDistance } from "./math.js"
import _Vector2D from "./vector.js"

class _World {
    time = 0
    gravity = 0
    delta = 0
    dimension = {
        width   : 5000,
        height  : 5000,
    }
}

class _Viewport {
    view = null
    dimension = {
        width: 900,
        height: 700,
    }
    #cursor = {
        prevPos: new _Vector2D,
        position: new _Vector2D,
        direction: 0,
        speed: 0,
    }
    
    constructor() {
        this.view = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.view.setAttribute('style', 'background: gray')
        this.view.setAttribute('width', this.dimension.width)
        this.view.setAttribute('height', this.dimension.height)

        document.body.setAttribute('style', 'display: flex; justify-content: center; align-items: center; height: 100vh; width: 100vw; overflow: hidden')
        document.body.appendChild(this.view)

        let box = this.view.getBoundingClientRect()
        // set the initial cursor position
        this.#cursor.position.x = this.#cursor.prevPos.x = 0 - box.left
        this.#cursor.position.y = this.#cursor.prevPos.y = 0 - box.top

        // keep track of the mouse cursor position
        document.addEventListener('mousemove', e => {
            box = this.view.getBoundingClientRect()
            const position = new _Vector2D(e.pageX - box.left, e.pageY - box.top)
            this.#cursor.direction = PointDirection(this.#cursor.prevPos, position)
            this.#cursor.speed = PointDistance(this.#cursor.prevPos, position)
            this.#cursor.position.Move(this.#cursor.speed, this.#cursor.direction)

            // update the previous cursor position
            this.#cursor.prevPos = position
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