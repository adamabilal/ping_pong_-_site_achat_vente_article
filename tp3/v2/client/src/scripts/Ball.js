import Mobile from './Mobile.js';


// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/balle24.png';
const SHIFT_X = 8;
const SHIFT_Y = 4;
const BALL_SIZE = 24;
const DELTA = 6;


/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */
export default class Ball extends Mobile {

  /**  build a ball
   *
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this ball belongs to
   */
  constructor(x, y, theGame) {
    super(x, y, BALL_IMAGE_SRC , SHIFT_X, SHIFT_Y);
    this.theGame = theGame;
  }
  move() {
    if (this.x > this.theGame.canvas.width - BALL_SIZE || this.x < 0) {
        this.shiftX = -this.shiftX;
        if (this.x <= 0 || (this.x + BALL_SIZE) >= this.theGame.canvas.width) {
           return true;
        }
    }
    if (this.y > this.theGame.canvas.height - BALL_SIZE || this.y < 0) {
        this.shiftY = -this.shiftY;
    }
    super.move();
}

  
  touchPaddle(paddleLeft, paddleRight) {
    let paddle = null;
    if (this.collisionWith(paddleLeft)) {
         paddle = paddleLeft;
    }
    else if (this.collisionWith(paddleRight)) {
         paddle = paddleRight;
    }
    if (paddle) {
        const paddleBall = paddle.img.height / 10;
        let impactBall = this.y + (BALL_SIZE / 2);
        if (impactBall >= paddle.y && impactBall < paddle.y + paddleBall) {
            this.shiftY = -4;
        }
        else if (impactBall >= paddleBall && impactBall < paddle.y + 2 * paddleBall) {
            this.shiftY = -3;
        }
        else if (impactBall >= 2 * paddleBall && impactBall < paddle.y + 3 * paddleBall) {
            this.shiftY = -2;
        }
        else if (impactBall >= 3 * paddleBall && impactBall < paddle.y + 4 * paddleBall) {
            this.shiftY = -2;
        }
        else if (impactBall >= 4 * paddleBall && impactBall < paddle.y + 5 * paddleBall) {
            this.shiftY = -1;
        }
        else if (impactBall >= 5 * paddleBall && impactBall < paddle.y + 6 * paddleBall) {
            this.shiftY = 0;
        }
        else if (impactBall >= 6 * paddleBall && impactBall < paddle.y + 7 * paddleBall) {
            this.shiftY = 1;
        }
        else if (impactBall >= 7 * paddleBall && impactBall < paddle.y + 8 * paddleBall) {
            this.shiftY = 2;
        }
        else if (impactBall >= 8 * paddleBall && impactBall < paddle.y + 9 * paddleBall) {
            this.shiftY = 3;
        }
        else if (impactBall >= 9 * paddleBall && impactBall < paddle.y + 10 * paddleBall) {
            this.shiftY = 4;
        }
        else { return;
        }
        this.shiftX = DELTA - Math.abs(this.shiftY);
        if (paddle === paddleRight) {
            this.shiftX = -this.shiftX;
        }
        this.x = this.x + this.shiftX;
        this.y = this.y + this.shiftY;
    }
    
}
collisionWith(paddle) {
  if(paddle.contains(this.x, this.y) || // coin en haut à gauche
  paddle.contains((this.x + BALL_SIZE), this.y) || // coin en bas à gauche
  paddle.contains(this.x, (this.y + BALL_SIZE)) || // coin en haut à droite
  paddle.contains((this.x + BALL_SIZE), (this.y + BALL_SIZE))) { // coin en bas à droite
      return true;
  }
  return false;
}

}
