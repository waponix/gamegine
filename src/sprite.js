import { _Polygon } from "./polygon.js"
import _Vector2D from "./vector.js"
import { Viewport, World } from "./world.js"

const NS_SVG = 'http://www.w3.org/2000/svg'

let CreateAnimatedSprite = options => {
    return new _AnimatedSprite(
        options.position,
        options.dimension,
        options.offset,
        options.texture,
        options.animationSpeed,
        options.animations,
        options.animationKey,
    )
}

let CreateLine = options => {
    return new _Line(
        options.position,
        options.dimension,
        options.offset,
        options.points,
        options.style,
    )
}

let CreateShape = options => {
    return new _Shape(
        options.position,
        options.dimension,
        options.offset,
        options.points,
        options.style,
    )
}

class _Sprite {
    position = null
    rotation = 0
    offset = { x: 1, y: 1, }
    dimension = { width: 0, height: 0, }
    scale = 1
    visible = true
    timestamp = null
    drawn = false

    constructor(
        position,
        dimension,
        offset,
    ) {
        this.position = position || this.position
        this.dimension = dimension || this.dimension
        this.offset = offset || this.offset
        this.timestamp = World.time
    }
    
    Draw() {

    }

    Clear() {

    }
}

class _AnimatedSprite extends _Sprite {
    texture = null
    animations = null
    animationKey = null
    animationSpeed = 1
    boundingBox = null
    image = null
    index = 0

    constructor(
        position,
        dimension,
        offset,
        texture,
        animationSpeed,
        animations,
        animationKey,
    ) {
        super(position, dimension, offset)

        this.texture = texture || this.texture
        this.animationSpeed = animationSpeed || this.animationSpeed
        this.animations = animations || this.animations
        this.animationKey = animationKey || this.animationKey

        this.timestamp = World.time

        // define the bounding box
        this.boundingBox = document.createElementNS(NS_SVG, 'svg')
        this.boundingBox.setAttribute('width', this.dimension.width * this.scale)
        this.boundingBox.setAttribute('height', this.dimension.height * this.scale)
        this.boundingBox.setAttribute('x', this.position.x + this.offset.x)
        this.boundingBox.setAttribute('y', this.position.y + this.offset.y)

        // element that actually loads the image,
        this.image = document.createElementNS(NS_SVG, 'image')
        this.image.setAttribute('href', this.texture)
        this.image.setAttribute('transform', `scale(${this.scale})`)
        this.image.setAttribute('x', 100)
        this.image.setAttribute('y', 0)

        // the image is placed inside the bounding box,
        // this way the image position can be changed to show the appropriate frame from the sprite sheet
        this.boundingBox.appendChild(this.image)
        Viewport.view.appendChild(this.boundingBox)
    }

    Draw () {
        // the bounding box will be the main element that needs to apply translation changes
        this.boundingBox.setAttribute('x', this.position.x + (this.offset.x * this.scale))
        this.boundingBox.setAttribute('y', this.position.y + (this.offset.y * this.scale))

        // the animation is achieved by changing the position of the image
        if (World.time - this.timestamp > 1000 * this.animationSpeed) {
            this.timestamp = World.time
            this.index++
        }

        const animation = this.animations[this.animationKey]

        if (this.index >= animation.frames) this.index = animation.index || 0

        this.image.setAttribute('y', animation.layer * -this.dimension.height)
        this.image.setAttribute('x', this.index * -this.dimension.width)
    }
}

class _Shape extends _Sprite {
    path = null
    style = 'stroke: white; stroke-width: 1; fill: transparent;'
    body = null
    #points = []
    
    constructor(
        position,
        dimension,
        offset,
        points,
        style,
    ) {
        super(position, dimension, offset)

        this.body = new _Polygon(...points)
        this.body.Move(this.position)

        this.style = style || this.style

        this.path = document.createElementNS(NS_SVG, 'path')
        this.#DrawPath()
        Viewport.view.appendChild(this.path)
        this.drawn = true
    }

    Draw() {
        if (this.drawn === false) Viewport.view.appendChild(this.path)
        this.#points = this.body.vertices
        this.#DrawPath()
        this.path.setAttribute('style', this.style)
        this.body.Move(this.position)
    }

    #DrawPath() {
        if (this.#points.length <= 0) return ''
        
        let i = 0
        let x = (this.#points[i].x * this.scale)
        let y = (this.#points[i].y * this.scale)

        let data = `M ${x},${y} `
        i++

        while (i < this.#points.length) {
            x = (this.#points[i].x * this.scale)
            y = (this.#points[i].y * this.scale)
            data += `L ${x},${y} `
            i++
        }

        data += 'z'

        this.path.setAttribute('d', data)
    }

    Clear() {
        this.drawn = false
        Viewport.view.removeChild(this.path)
    }
}

export {
    CreateAnimatedSprite,
    CreateLine,
    CreateShape,
}