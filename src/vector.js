import { DotProduct, PointDistance, PointMagnitude } from "./math.js";

class _Vector2D
{
    x = 0
    y = 0

    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    Move(distance, angle) {
        this.x += distance * Math.cos(angle)
        this.y += distance * Math.sin(angle)
    }

    // Detects when a point touches a line;
    // Where this is the point;
    // And vector1 is the start point of the line;
    // And vector2 is the end point of the line;
    // Will return a boolean;
    Touches(vector1, vector2) {
        // Simply check first if the points are equal
        if (this.x + this.y === vector1.x + vector1.y) return true
        if (this.x + this.y === vector2.x + vector2.y) return true

        // Calculate the distances between the point and the line endpoints
        const dx = vector2.x - vector1.x
        const dy = vector2.y - vector1.y
        const d1 = PointDistance(this, vector1)
        const d2 = PointDistance(this, vector2)
    
        // Calculate the length of the line segment
        const lineLength = Math.sqrt(PointMagnitude({x: dx, y: dy}))
    
        // Define a small threshold to handle floating point errors
        const epsilon = 0.0001
    
        // Check if the sum of the distances is approximately equal to the length of the line segment
        return Math.abs(d1 + d2 - lineLength) < epsilon
    }

    // Detects when two lines intersects each other;
    // Where this is the start point of the first line;
    // And vector1 is the end point of the first line;
    // And vector2 is the start point of the seconde line;
    // And vector3 is the end point of the second line;
    // Will return a _Vector2D of the intersection point;
    // Or return false;
    Intersects(vector1, vector2, vector3) {
        
        const det = (vector1.x - this.x) * (vector3.y - vector2.y) - (vector3.x - vector2.x) * (vector1.y - this.y)
        const lambda = ((vector3.y - vector2.y) * (vector3.x - this.x) + (vector2.x - vector3.x) * (vector3.y - this.y)) / det
        const gamma = ((this.y - vector1.y) * (vector3.x - this.x) + (vector1.x - this.x) * (vector3.y - this.y)) / det

        if (0 < lambda && lambda < 1 && 0 < gamma && gamma < 1) {
            // Lines intersect within the range of their endpoints
            const x = this.x + lambda * (vector1.x - this.x)
            const y = this.y + lambda * (vector1.y - this.y)
            return new _Vector2D(x, y)
        } else {
            // Lines do not intersect within the range of their endpoints
            return false
        }
    }

    // Calculate the distance from another vector
    // Where vector is another point to get the distance
    // Returns the distance in integer
    Distance(vector) {
        return PointDistance(this, vector)
    }
}

export default _Vector2D