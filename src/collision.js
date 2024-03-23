import { DegToRad, OppositeDirection, PointDirection, PointDistance, ReflectionAngle } from "./math.js"
import { CreateShape } from "./sprite.js"
import _Vector2D from "./vector.js"

const HitSide = (vector1, vector2, sides) => {
    for (const side of sides) {
        if (vector1.Intersects(vector2, side.s, side.e)) return side
    }

    false
}

const Collision = (entity1, entity2) => {
    let sides = new Map
    let body1 = entity1.Sprite().body
    let body2 = entity2.Sprite().body

    body1.vertices.forEach(vertex1 => {
        body2.sides.forEach(side => {
            // determine the distance of each side
            const distance = vertex1.Distance(side.s) + vertex1.Distance(side.e)
            sides.set(distance, [vertex1, side])
        })
    })

    // arrange the closest vertices
    const closest = [...sides.keys()].sort((a, b) => a - b)

    let flag = false
    let reflectionLine = null
    let intersection = new _Vector2D

    // check intersection of each sides of the nearest vertices
    for (const n of closest) {
        const [vertex1, closestSide] = sides.get(n)
        const link1 = body1.links.get(vertex1)
        
        if (intersection = vertex1.Intersects(link1.s, closestSide.s, closestSide.e)) {
            reflectionLine = HitSide(body1.Pivot(), body2.Pivot(), body2.sides.values())
            flag = true; break
        }
        if (intersection = vertex1.Intersects(link1.e, closestSide.s, closestSide.e)) {
            reflectionLine = HitSide(body1.Pivot(), body2.Pivot(), body2.sides.values())
            flag = true; break
        }
    }

    if (flag) {
        if (!intersection || !reflectionLine) return

        const pivot = body1.Pivot()
        let movePoint = new _Vector2D(pivot.x, pivot.y)
        // move back the body backward from where it came from
        
        movePoint.Move(1, reflectionLine.f)
        // move the body to the equivalent reflection angle
        // movePoint.Move(body1.force, ReflectionAngle(body1.direction, reflectionLine[0], reflectionLine[1]))
        entity1.position.x = movePoint.x
        entity1.position.y = movePoint.y
        body1.Move(entity1.position)

        Collision(entity1, entity2)

        // let collisionIndicator = CreateShape({
        //     points: [
        //         reflectionLine.s,
        //         reflectionLine.e,
        //     ],
        //     style: 'stroke: red; stroke-width: 1'
        // })

        // collisionIndicator.Draw()

        // const midPoint = reflectionLine.MidPoint()
        // let endPoint = new _Vector2D(midPoint.x, midPoint.y)
        // endPoint.Move(25, reflectionLine.f)
        // let faceLine = CreateShape({
        //     points: [
        //         midPoint,
        //         endPoint,
        //     ],
        //     style: 'stroke: #4f4; stroke-width: 1'
        // })

        // faceLine.Draw()
        // setTimeout(() => {
        //     collisionIndicator.Clear()
        //     faceLine.Clear()
        // }, 100)
    }
}

export {
    Collision
}