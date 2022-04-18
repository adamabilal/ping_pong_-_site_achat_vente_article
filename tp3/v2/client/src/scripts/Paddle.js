import Mobile from './Mobile.js';
import MoveState from './MoveState.js';

const  image_Paddle_Src= './images/paddle.png';

export default class Paddle extends Mobile {

    
    constructor(x, y) {
        super(x, y, image_Paddle_Src, 0, 8);
        this._moving = MoveState.NONE;
    }

   
    get up () {
        return (this._moving == MoveState.UP);
    }
    
   
    get down () {
        return (this._moving == MoveState.DOWN);
    }
    
   
    get moving() {
        return this._moving;
    }

    
    set moving(moving) {
        this._moving = moving;
    }

    
    moveDown() {
        this.shiftY = 8;
        this.moving = MoveState.DOWN;
    }

   
    moveUp() {
        this.shiftY = -8;
        this.moving = MoveState.UP;
    }
    stopMoving() {
        this.moving = MoveState.NONE;
    }
    move(canvas) {
        if (this.moving === MoveState.DOWN) {
            this.y = Math.min(520, this.y + this.shiftY);
        }
        if (this.moving === MoveState.UP) {
            this.y = Math.max(0, this.y + this.shiftY);
        }
    }

  
    contains(x, y) {
    if((this.x <= x && x <= (this.x + this.img.width)) && (this.y <= y && y <= (this.y + this.img.height))) {
        return true;
    }
    return false;
}
}