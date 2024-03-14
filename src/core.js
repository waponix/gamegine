import { World, Viewport, Events } from './world.js'
import { CreateEntity, RegisterEntity } from './object.js'
import _Player from './player.js'
import { CreateLine } from './sprite.js'
import _Vector2D from './vector.js'
import { MovePoint, PointDirection, PointIntersect } from './math.js'

RegisterEntity('player', _Player)

let player = CreateEntity('player')

let line1 = CreateLine({
    points: [
        player.position,
        Viewport.GetCursor().position,
    ]
})

let line2 = CreateLine({
    points: [
        new _Vector2D(200, 350),
        new _Vector2D(700, 350),
    ]
})

let l1 = CreateLine({
    style: 'stroke: #ff0000; stroke-width: 2'
})

let l2 = CreateLine({
    style: 'stroke: #ff0000; stroke-width: 2'
})

let steps = (elapsed) => {
    // before update
    Events.OnBeforeWorldUpdate()

    window.requestAnimationFrame(steps)
    // update
    World.time = elapsed // update the world time
    player.Update()

    player.Draw()

    const iv = PointIntersect([line1.points[0], Viewport.GetCursor().position], line2.points)

    l1.points[0].x = 0
    l1.points[0].y = 0
    l1.points[1].x = 0
    l1.points[1].y = 0

    l2.points[0].x = 0
    l2.points[0].y = 0
    l2.points[1].x = 0
    l2.points[1].y = 0

    if (iv !== null) {
        let frontAngle = PointDirection(iv, line1.points[1])
        let backAngle = PointDirection(iv, line1.points[0])
        let moveBackward = MovePoint(5, backAngle)
        let moveForward = MovePoint(5, frontAngle)

        l1.points[0].x = iv.x + moveBackward.x
        l1.points[0].y = iv.y + moveBackward.y
        l1.points[1].x = iv.x + moveForward.x
        l1.points[1].y = iv.y + moveForward.y

        frontAngle = PointDirection(iv, line2.points[1])
        backAngle = PointDirection(iv, line2.points[0])
        moveBackward = MovePoint(5, backAngle)
        moveForward = MovePoint(5, frontAngle)
        
        l2.points[0].x = iv.x + moveBackward.x
        l2.points[0].y = iv.y + moveBackward.y
        l2.points[1].x = iv.x + moveForward.x
        l2.points[1].y = iv.y + moveForward.y
    }

    line1.Draw()
    line2.Draw()
    l1.Draw()
    l2.Draw()

    Events.OnWorldUpdate()
}

window.requestAnimationFrame(steps)