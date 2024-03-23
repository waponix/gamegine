import _Vector2D from "./vector.js"

const DotProduct = (point1, point2) => {
    return point2.x * point1.x + point2.y * point1.y
}

const PointMagnitude = point => {
    return point.x * point.x + point.y * point.y
}

const PointDistance = (vectorFrom, vectorTo) => {
    let x = vectorTo.x - vectorFrom.x
    let y = vectorTo.y - vectorFrom.y
    return Math.sqrt(PointMagnitude({x, y}))
}

// returns angle in radian
const PointDirection = (vectorFrom, vectorTo) => {
    let x = vectorTo.x - vectorFrom.x
    let y = vectorTo.y - vectorFrom.y
    return Math.atan2(y, x)
}

const ReflectionAngle = (incidentAngle, vector1, vector2) => {
    // Calculate the angle of the line
    const lineAngle = Math.atan2(vector2.y - vector1.y, vector2.x - vector1.x)
    
    // Calculate the angle between the direction vector and the line
    const angleDifference = incidentAngle - lineAngle

    // Calculate the reflected angle
    const reflectedAngle = incidentAngle - 2 * angleDifference
    
    // Ensure the reflected angle is within [0, 2 * Math.PI] range
    return (reflectedAngle + 2 * Math.PI) % (2 * Math.PI)
}

// const ReflectionAngle = (incidentAngle, startPoint, endPoint, lineOrientationAngle) => {
//     // Calculate the angle of the line
//     const lineAngle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
    
//     // Calculate the angle between the direction vector and the line
//     const angleDifference = incidentAngle - lineAngle;

//     // Calculate the reflected angle
//     let reflectedAngle = incidentAngle - 2 * angleDifference;
    
//     // Normalize the angle to [0, 2 * Math.PI] range
//     reflectedAngle = normalizeAngle(reflectedAngle);

//     // Adjust the reflected angle relative to the line orientation angle
//     reflectedAngle += lineOrientationAngle;

//     // Normalize the adjusted angle again
//     reflectedAngle = normalizeAngle(reflectedAngle);

//     return reflectedAngle;
// }

// const normalizeAngle = angle => {
//     return (angle + 2 * Math.PI) % (2 * Math.PI);
// }

// returns a vector value based on the distance and angle
const DistanceToPoint = (distance, angle) => new _Vector2D(distance * Math.cos(angle), distance * Math.sin(angle))

const DegToRad = deg => deg * (Math.PI / 180)

const RadToDeg = rad => rad / Math.PI * 180

// Gives the opposite direction or angle of a given angle;
// Where angle is a value in radian;
// Returns an opposite angle value in radian;
const OppositeDirection = angle => {
    // Calculate the opposite direction using trigonometry
    var oppositeX = Math.cos(angle + Math.PI)
    var oppositeY = Math.sin(angle + Math.PI)

    return PointDirection(new _Vector2D, new _Vector2D(oppositeX, oppositeY))
}

export {
    PointDistance,
    PointDirection,
    PointMagnitude,
    DistanceToPoint,
    DegToRad,
    DotProduct,
    RadToDeg,
    ReflectionAngle,
    OppositeDirection,
}