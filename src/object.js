import _Vector2D from "./vector.js"

let entities = {}
let classes = {}

let CreateEntity = name => {
    if (!classes[name]) {
        console.log(`The entity named ${name} is not found`) 
        return
    }

    let entity = new classes[name](name)
    entity.Init()
    entities[entity.id] = entity
    return entity
}

let RegisterEntity = (id, entity) => {
    classes[id] = entity
}

// Creates an entity object
class _Entity {
    id = null
    name = null
    position = new _Vector2D
    solid = true
    static = false
    timestamp = null
    direction = 0
    #sprite = null

    constructor(name) {
        this.name = name
        this.timestamp = Date.now()
        this.id = `${this.name}${this.timestamp}`
    }

    Init() {}
d
    Update () {}

    Draw() {
        if (this.#sprite === null) return
        this.#sprite.Draw()
    }

    SetSprite(sprite) {
        this.#sprite = sprite
        return this
    }

    Sprite() {
        return this.#sprite
    }
}

export {
    CreateEntity,
    RegisterEntity,
    _Entity
}