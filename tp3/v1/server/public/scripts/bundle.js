(()=>{"use strict";class t extends class{constructor(t,s,i,h=0,e=0){this.y=s,this.x=t,this.img=new Image,this.img.src=i,this.shiftX=h,this.shiftY=e}get width(){return this.img.width}get height(){return this.img.height}move(){this.x=this.x+this.shiftX,this.y=this.y+this.shiftY}draw(t){t.drawImage(this.img,this.x,this.y)}stopMoving(){this.shiftX=0,this.shiftY=0}}{constructor(t,s,i){super(t,s,"./images/balle24.png",8,4),this.theGame=i}move(){this.y<=0||this.y+this.height>=this.theGame.canvas.height?this.shiftY=-this.shiftY:(this.x<=0||this.x+this.width>=this.theGame.canvas.width)&&(this.shiftX=-this.shiftX),super.move()}}class s{constructor(s){this.raf=null,this.canvas=s,this.ball=new t(this.canvas.width/2,this.canvas.height/2,this)}start(){this.animate()}stop(){window.cancelAnimationFrame(this.raf)}animate(){this.moveAndDraw(),this.raf=window.requestAnimationFrame(this.animate.bind(this))}moveAndDraw(){const t=this.canvas.getContext("2d");t.clearRect(0,0,this.canvas.width,this.canvas.height),this.ball.move(),this.ball.draw(t)}}window.addEventListener("load",(()=>{const t=document.getElementById("field"),i=new s(t);document.getElementById("start").addEventListener("click",(()=>h(i)))}));let i=!1;const h=t=>{i?(document.getElementById("start").value="jouer",t.stop()):(t.start(),document.getElementById("start").value="stop"),i=!i}})();