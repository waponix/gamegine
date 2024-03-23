import { DegToRad, OppositeDirection, PointDirection, PointDistance } from "./math.js"
import _Vector2D from "./vector.js"

class _PSide
{
    s = null
    e = null
    f = null

    constructor(startPoint, endPoint)
    {
        this.s = startPoint
        this.e = endPoint
    }

    MidPoint() {
        return new _Vector2D((this.s.x + this.e.x) * 0.5, (this.s.y + this.e.y) * 0.5)
    }
}

class _Polygon
{
    vertices = null
    sides = new Map
    links = new Map
    force = 0
    direction = 0
    dimension = {
        width: 0,
        height: 0,
    }

    constructor (...vectors) {
        this.vertices = vectors

        // determine point sides
        const count = this.vertices.length
        if (count <= 0) return

        let v = 0, s = count - 1, e = v + 1

        while (v < count) {
            this.sides.set(
                this.vertices[v], 
                new _PSide(this.vertices[v], this.vertices[e])
            )

            this.links.set(
                this.vertices[v], 
                new _PSide(this.vertices[s], this.vertices[e])
            )

            v ++
            s = s + 1 >= count ? 0 : s + 1
            e = e + 1 >= count ? 0 : e + 1
        }

        
        let sides = [...this.sides.values()]
        let sc = 0
        const rightAngle = DegToRad(90)
        while (sc < sides.length) {
            let f = sides.shift()
            const pAngle = PointDirection(f.s, f.e) - rightAngle
            const midPoint = f.MidPoint()
            const endPoint = new _Vector2D(midPoint.x, midPoint.y)
            endPoint.Move(1000, pAngle)
            for (const s of sides) {
                if (midPoint.Intersects(endPoint, s.s, s.e)) {
                    f.f = OppositeDirection(pAngle)
                } else {
                    f.f = pAngle
                }
            }

            sides.push(f)

            sc++
        }
    }

    Pivot() {
        let aX = new Map
        let aY = new Map

        this.vertices.forEach((v) => {
            aX.set(v.x, v.x)
            aY.set(v.y, v.y)
        })

        const minX = Math.min(...aX.values())
        const minY = Math.min(...aY.values())
        const maxX = Math.max(...aX.values())
        const maxY = Math.max(...aY.values())

        this.dimension.width = maxX - minX
        this.dimension.height = maxY - minY

        return new _Vector2D((minX + maxX) * 0.5, (minY + maxY) * 0.5)
    }

    Move(point) {
        if (point === null) return
        const pivot = this.Pivot()
        this.direction = PointDirection(pivot, point)
        this.force = PointDistance(pivot, point)

        this.vertices.forEach(v => v.Move(this.force, this.direction))
    }
}

export {
    _Polygon
}