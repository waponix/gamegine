import { _Entity } from "./object.js"
import { Events } from "./world.js"
import { CreateAnimatedSprite } from "./sprite.js"
import _Vector2D from "./vector.js"
import { MovePoint, PointDirection } from "./math.js"

class _Player extends _Entity
{
    speed = 2.5
    velocity = 0
    direction = 0
    friction = 0.2
    #idleAnimationKey = "idle_face_down"
    state = 'on_land'

    Init() {
        this.position.x = 100
        this.position.y = 100

        this.SetSprite(CreateAnimatedSprite(
            {
                texture: '../assets/boy_sprite_sheet.png',
                animationSpeed: 0.1,
                animationKey: this.#idleAnimationKey,
                animations: {
                    'walk_down'         : { frames: 4, layer: 0 },
                    'walk_up'           : { frames: 4, layer: 1 },
                    'walk_left'         : { frames: 4, layer: 2 },
                    'walk_right'        : { frames: 4, layer: 3 },
                    'idle_face_down'    : { frames: 1, layer: 0, index: 0 },
                    'idle_face_up'      : { frames: 1, layer: 1, index: 0 },
                    'idle_face_left'    : { frames: 1, layer: 2, index: 0 },
                    'idle_face_right'   : { frames: 1, layer: 3, index: 1 },
                },
                position: this.position,
                dimension: { width: 184, height: 275, },
                offset: { x: -92, y: -138 },
            }
        ))
    }

    Update() {
        switch (this.state) {
            case 'on_land':
            default:
                this
                    .#AllowMovement()
        }
    }

    #AllowMovement() {
        this.Sprite().animationKey = this.#idleAnimationKey

        let xy = new _Vector2D

        this.velocity = this.velocity <= 0 ? 0 : this.velocity -= this.friction

        if (Events.OnKeyPressed('w')) {
            xy.y = -1;
            this.velocity = this.speed;
            this.Sprite().animationKey = 'walk_up'
            this.#idleAnimationKey = 'idle_face_up'
        }
        if (Events.OnKeyPressed('s')) {
            xy.y = 1;
            this.velocity = this.speed;
            this.Sprite().animationKey = 'walk_down'
            this.#idleAnimationKey = 'idle_face_down'
        }
        if (Events.OnKeyPressed('a')) {
            xy.x = -1;
            this.velocity = this.speed;
            this.Sprite().animationKey = 'walk_left'
            this.#idleAnimationKey = 'idle_face_left'
        }
        if (Events.OnKeyPressed('d')) {
            xy.x = 1;
            this.velocity = this.speed;
            this.Sprite().animationKey = 'walk_right'
            this.#idleAnimationKey = 'idle_face_right'
        }

        // get the direction
        if (this.velocity === this.speed) this.direction = PointDirection(new _Vector2D, xy)

        const move = MovePoint(this.velocity, this.direction)

        this.position.x += move.x
        this.position.y += move.y

        return this
    }
}

export default _Player