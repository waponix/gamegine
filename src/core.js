import { World, Viewport, Events } from './world.js'
import { CreateEntity, RegisterEntity } from './object.js'
import _Vector2D from './vector.js'

import _Player from './entities/player.js'
import _Block from './entities/block.js'
import { CreateShape } from './sprite.js'
import { Collision } from './collision.js'

RegisterEntity('player', _Player)
RegisterEntity('block', _Block)

let player = CreateEntity('player')
let block = CreateEntity('block')
let block1 = CreateEntity('block')
let block2 = CreateEntity('block')
let block3 = CreateEntity('block')
let block4 = CreateEntity('block')

let line = CreateShape({
    points: [
        player.position,
        block.position,
    ]
})

const dm = 1000
let prevElapsed = 0

let steps = (elapsed) => {
    // before update
    Events.OnBeforeWorldUpdate()

    World.delta = elapsed / dm - prevElapsed

    window.requestAnimationFrame(steps)
    // update
    World.time = elapsed // update the world time

    player.Update()
    block.Update()
    block1.Update()
    block2.Update()
    block3.Update()
    block4.Update()

    Collision(player, block)
    Collision(player, block1)
    Collision(player, block2)
    Collision(player, block3)
    Collision(player, block4)

    player.Draw()
    block.Draw()
    block1.Draw()
    block2.Draw()
    block3.Draw()
    block4.Draw()

    // line.Draw()
    

    Events.OnWorldUpdate()
    prevElapsed = elapsed / dm
}

window.requestAnimationFrame(steps)