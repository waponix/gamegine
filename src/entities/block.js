import { _Entity } from "../object.js";
import { CreateShape } from "../sprite.js";
import _Vector2D from "../vector.js";

class _Block extends _Entity
{
    Init() {
        this.position.x = Math.random() * 900
        this.position.y = Math.random() * 700
        // this.position.x = 200
        // this.position.y = 200
        
        this.SetSprite(
            CreateShape({
                position: this.position,
                style: 'stroke: white; stroke-width: 1; fill: black;',
                points: [
                    new _Vector2D(50, 0),
                    new _Vector2D(80, 5),
                    new _Vector2D(100, 10),
                    new _Vector2D(120, 40),
                    new _Vector2D(115, 86),
                    new _Vector2D(100, 100),
                    new _Vector2D(30, 110),
                    new _Vector2D(0, 70),
                    new _Vector2D(10, 35),

                    // new _Vector2D,
                    // new _Vector2D(50, 0),
                    // new _Vector2D(50, 80),
                    // new _Vector2D(0, 80),

                    // new _Vector2D(50, 0),
                    // new _Vector2D(100, 0),
                    // new _Vector2D(150, 50),
                    // new _Vector2D(100, 100),
                    // new _Vector2D(50, 100),
                    // new _Vector2D(0, 50),
                ]
            })
        )
    }
}

export default _Block