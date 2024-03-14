import _Vector2D from "./vector.js"

let PointDistance = (vectorFrom, vectorTo) => {
    let x = vectorTo.x - vectorFrom.x
    let y = vectorTo.y - vectorFrom.y
    return Math.sqrt((x * x) + (y * y))
}

// returns angle in radian
let PointDirection = (vectorFrom, vectorTo) => {
    let x = vectorTo.x - vectorFrom.x
    let y = vectorTo.y - vectorFrom.y
    return Math.atan2(y, x)
}

// get the point where two lines intersect
let PointIntersect = (line1, line2) => {
    const [p1, p2] = line1;
    const [p3, p4] = line2;
    
    const det = (p2.x - p1.x) * (p4.y - p3.y) - (p4.x - p3.x) * (p2.y - p1.y)
    const lambda = ((p4.y - p3.y) * (p4.x - p1.x) + (p3.x - p4.x) * (p4.y - p1.y)) / det
    const gamma = ((p1.y - p2.y) * (p4.x - p1.x) + (p2.x - p1.x) * (p4.y - p1.y)) / det

    if (0 < lambda && lambda < 1 && 0 < gamma && gamma < 1) {
        // Lines intersect within the range of their endpoints
        const x = p1.x + lambda * (p2.x - p1.x)
        const y = p1.y + lambda * (p2.y - p1.y)
        return new _Vector2D(x, y)
    } else {
        // Lines do not intersect within the range of their endpoints
        return null
    }
}

// returns a vector value based on the distance and angle
let MovePoint = (distance, angle) => new _Vector2D(distance * Math.cos(angle), distance * Math.sin(angle))

let DegToRad = deg => deg * (Math.PI / 180)

let RadToDeg = (rad) => rad / Math.PI * 180

export {
    PointDistance,
    PointDirection,
    PointIntersect,
    MovePoint,
    DegToRad,
    RadToDeg,
}