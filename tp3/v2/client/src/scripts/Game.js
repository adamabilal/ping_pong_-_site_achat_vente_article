import Ball from './Ball.js';
import Paddle from './Paddle.js';


/**
 * a Game animates a ball bouncing in a canvas
 */
 const socket = io();
 const pPlayer = document.getElementById('player');
export default class Game {

  /**
   * build a Game
   *
   * @param  {Canvas} canvas the canvas of the game
   */
  constructor(canvas) {
    this.raf = null;
    this.canvas = canvas;
    this.ball = new Ball(40, 256,this);
    this._paddleLeft = new Paddle(40, 256,this); // place le padlle au millieu de la hauteur du canvas.
    this._paddleRight = new Paddle(740, 256,this);
    this._isPlaying = false;
    this._player = null;
    this._scoreHome = 0;
    this._scoreVisitor = 0;
    this._ctxt = null;
    socket.emit('start');

    
  }
  /*
    * get this._player.
    */
  get player() {
    return this._player;
}

/*
* set this._player.
*/
set player(player) {
    this._player = player;
}

/*
* get this._scoreHome.
*/
get scoreHome() {
    return this._scoreHome;
}

/*
* set this._scoreHome.
*/
set scoreHome(scoreHome) {
    this._scoreHome = scoreHome;
}

get scoreVisitor() {
    return this._scoreVisitor;
}

set scoreVisitor(scoreVisitor) {
    this._scoreVisitor = scoreVisitor;
}
 contextManagement() {
  this.ctxt.font = 'bold 70px serif';
  this.ctxt.fillText(this.scoreHome.toString(), 200, 325);
  this.ctxt.fillText(this.scoreVisitor.toString(), 600, 325);
} 


  /*
    * Déplacement du paddle droit vers le haut
    */
  rightPaddleUp() {
    this.paddleRight.moveUp();
}

/*
* Déplacement du paddle droit vers le bas
*/
rightPaddleDown()
{   
    this.paddleRight.moveDown();
}

/*
*  Arret de déplacement du paddle droit
*/
rightPaddleStopMoving()
{   
    this.paddleRight.stopMoving();
}
/*
    * get this._paddleRight.
    */
get paddleRight() {
  return this._paddleRight;
}

/*
* set this._paddleRight.
*/
set paddleRight(paddleRight) {
  throw "Exception : paddleRight cannot be modfied";
}
paddleLeftstop() {
    return (currentY) => {
        this.paddleLeft.y = currentY;
        this.leftPaddleStopMoving();
    };
}
get paddleLeft() {
    return this._paddleLeft;
}
set paddleLeft(paddleLeft) {
  throw "Exception : paddleLeft cannot be modfied";
}
leftPaddleUp() {
    this.paddleLeft.moveUp();
}
leftPaddleDown()
 {   
    this.paddleLeft.moveDown();
 }

  leftPaddleStopMoving()
  {   
    this.paddleLeft.stopMoving();
  }
 keyDownActionHandler(event) {
  switch (event.key) {
          case "ArrowUp":
          case "Up":
          case "z" :
              this.paddleLeft.moveUp();
              socket.emit('paddleLeftUp');
              break;
          case "ArrowDown":
          case "Down":
          case "s":
              this.paddleLeft.moveDown();
              socket.emit('paddleLeftDown');
              break;
          default: return;
      }
      event.preventDefault();
  }
  keyUpActionHandler(event) {
    switch (event.key) {
        case "ArrowUp":
        case "Up":
        case "z":
        case "ArrowDown":
        case "Down":
        case "s":
            this.paddleLeft.stopMoving();
            socket.emit('paddleLeftStop', this.paddleLeft.y);
            break;
        default: return;
    }
    event.preventDefault();
}
  /** start this game animation */
  start() {
    this.animate();
  }
  /** stop this game animation */
  stop() {
    window.cancelAnimationFrame(this.raf);
  }

  /** animate the game : move and draw */
  animate() {
    this.ctxt = this.canvas.getContext("2d");
    this.ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.moveAndDrawPaddles();
    this.ballManagement();
    this.contextManagement();
    this.newBallWasSend();
    this.synchroBallWasSend();
    this.raf = window.requestAnimationFrame(this.animate.bind(this));
  }
  /** move then draw the bouncing ball */
  
/*
    * Gestion déplacement des paddles.
    */
moveAndDrawPaddles() {
  this.paddleLeft.move(this.canvas);
  this.paddleLeft.draw(this.ctxt);
  this.paddleRight.move(this.canvas);
  this.paddleRight.draw(this.ctxt);
}
ballManagement() {
  if (this.ball) {
      this.ball.draw(this.ctxt);
      if (!this.ball == false) {
          this.ball.touchPaddle(this.paddleLeft, this.paddleRight);
          this.ball.move(this.canvas);
          this.synchroBall();
      }
      else {
          if (this.ball.x < 40) {
              this.scoreVisitor = this.scoreVisitor + 1;
          }
          else if (this.ball.x > 760) {
              this.scoreHome = this.scoreHome + 1;
          }
          this._ball = null;
          socket.emit('!isPlaying');
          this._isPlaying = false;
      }
  }
}
 synchroBallWasSend() {
  return (x, y, shiftX, shiftY) => {
      this._ball = new Ball(Math.abs(x - 800), y);
      this._ball.shiftX = -shiftX;
      this._ball.shiftY = shiftY;
  };
}

newBallWasSend() {
  return (x, y, shiftX, shiftY) => {
      this._ball = new Ball(Math.abs(x - 800), y);
      this._ball.shiftX = -shiftX;
      this._ball.shiftY = shiftY;
  };
} 

get context() {
  return this._ctxt;
}

/*
* set this._context.
*/
set context(ctxt) {
  this._ctxt = ctxt
}
 startNewPoint(event) {
  if (!this._isPlaying){
      if (event.key == " ") {
          if (!this._ball || this._ball.x <= 400) {
              this._ball = new Ball(this.paddleLeft.x + 30, this.paddleLeft.y + 32); // place la balle au millieu de la raquette.
          }
          else {
              this._ball = new Ball(this.paddleRight.x - 50, this.paddleRight.y + 32); // place la balle au millieu de la raquette.
              this._ball.shiftX = -6
          }
          socket.emit('newBall', this.ball.x, this.ball.y, this.ball.shiftX, this.ball.shiftY);
          this._isPlaying = true;
          event.preventDefault(); 
      }
  } 
  
}  
 youCanStart() {
  return () => {
      window.addEventListener('keyup', this.startNewPoint.bind(this));
  };
}
firstPlayerConnected() {
  return () => {
      pPlayer.textContent = "First Player";
      this.player = "first";
  };
}
secondPlayerConnected() {
  return () => {
      pPlayer.textContent = "Second Player";
      this.player = "second";
  };
}


/*
    * Gestion Reception de Socket
    */
socketManagement() {
  socket.on('firstPlayerConnected', this.firstPlayerConnected());
  socket.on('secondPlayerConnected', this.secondPlayerConnected());
  socket.on('youCanStart', this.youCanStart());
  socket.on('paddleRightUp', () => this.rightPaddleUp());
  socket.on('paddleRightDown', () => this.rightPaddleDown());
  socket.on('paddleRightStop', this.paddleRightstop());
  socket.on('newBallWasSend', this.newBallWasSend());
  socket.on('synchroBallWasSend', this.synchroBallWasSend());
}
synchroBall(){
  switch(this.ball.x) {
      case 200 :
          socket.emit('synchroBall', this.ball.x, this.ball.y, this.ball.shiftX, this.ball.shiftY);
          break;
      case 400 :
          socket.emit('synchroBall', this.ball.x, this.ball.y, this.ball.shiftX, this.ball.shiftY);
          break;
      case 600 :
          socket.emit('synchroBall', this.ball.x, this.ball.y, this.ball.shiftX, this.ball.shiftY);
          break;
      default: return;
  }
}
}
