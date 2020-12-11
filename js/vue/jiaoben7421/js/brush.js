'use strict';
const Brush = function(options) {
  this.canvas = document.getElementById(options.el);
  this.ctx = this.canvas.getContext("2d");
  this.canvas.width = options.width;
  this.canvas.height = options.height;
  this.ctx.fillStyle = "rgba(0,0,0,0.8)";
  const _this = this;
  this.p =0;
  this.l = 20;
  this.arr = [];
  //鼠标场景--电脑端.
  this.canvas.onmousedown = this.downEvent.bind(this);
  this.canvas.onmousemove = this.moveEvent.bind(this);
  this.canvas.onmouseup = this.upEvent.bind(this);
  //触摸场景--手机端/触摸屏机
  this.canvas.addEventListener("touchstart", this.downEvent.bind(this), false);
  this.canvas.addEventListener("touchmove", this.moveEvent.bind(this), false);
  this.canvas.addEventListener("touchend", this.upEvent.bind(this), false);
  this.canvas.addEventListener("contextmenu", function(e){ e.preventDefault() }, false);
  this.moveFlag = false;
  this.upof = {};
  this.radius = 0;
  this.has = [];
  this.lineMax = 20;
  this.lineMin = 10;
  this.linePressure = 1;
  this.smoothness = 80;
  this.img = document.getElementById('pen2'); //默认笔刷
  //this.img1 = document.getElementById('pen2');
}
Brush.prototype.clear = function() {
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}
Brush.prototype.clickEvent = function(e) {
  this.cli = this.getXY(e);
}
Brush.prototype.downEvent = function (e) {
  window.console.log('点击');
  this.moveFlag = true;
  this.has = [];
  this.upof = this.getXY(e);
  // this.ctx.drawImage(this.img,(this.upof.x - this.big/2),(this.upof.y - this.big/2),this.big,this.big);
  var x1 = this.upof.x;
  var y1 = this.upof.y;
  this.arr.unshift({x1,y1});
};
Brush.prototype.moveEvent = function (e) {
  if (!this.moveFlag)
    return;
  e.preventDefault();
  var of = this.getXY(e); //move
  var up = this.upof;  //down
  var ur = this.radius;  //banjing
  var b = 0;
  this.has.unshift({time:new Date().getTime() ,dis:this.distance(up,of)});
  var dis = 0;
  var time = 0;
  for (var n = 0; n < this.has.length-1; n++) {
    dis += this.has[n].dis;
    time += this.has[n].time-this.has[n+1].time;
    if (dis>this.smoothness)
      break;
  }
  var or = Math.min(time/dis*this.linePressure+this.lineMin , this.lineMax) / 2;
  this.radius = or;
  this.upof = of;
  var len = Math.round(this.has[0].dis/2)+1;
  for (var i = 0; i < len; i++) {
    var x = up.x + (of.x-up.x)/len*i;
    var y = up.y + (of.y-up.y)/len*i;
    var r = ur + (or-ur)/len*i;
    this.ctx.beginPath();
    // this.ctx.arc(x,y,r,0.2*Math.PI,1.5*Math.PI,true);
    // this.ctx.fill();
    var r_r = r*2;

    x = x-this.l/2;
    y = y - this.l/2;
    this.arr.unshift({x,y});
    this.ctx.drawImage(this.img,x,y,this.l,this.l);
    this.l = this.l - 0.2;
    if( this.l < 10) this.l = 10;
    this.p++;
  }
}
Brush.prototype.upEvent = function (e) {
  this.moveFlag = false;
  this.l = 20;
  if(this.arr.length >100){
    for(var j = 0; j <60 ;j++){
      // arr[j].x = arr[j].x - 2;
      // arr[j].y = arr[j].y - 1;
      this.arr[j].x = this.arr[j].x-this.l/4;
      this.arr[j].y = this.arr[j].y - this.l/4;
      this.ctx.drawImage(this.img,this.arr[j].x,this.arr[j].y,this.l,this.l);

      this.l = this.l - 0.3;
      if( this.l < 5) this.l = 5;
    }
    this.l = 20;
    this.arr = [];
  }
  if (this.arr.length==1) {
    // this.arr[0].x =
    this.ctx.drawImage(this.img,this.arr[0].x1 - this.l/2,this.arr[0].y1 - this.l/2,this.l,this.l);
    this.arr = [];
  }
}
Brush.prototype.getXY = function (e)
{
  var x = e.clientX || e.touches[0].clientX;
  var y = e.clientY || e.touches[0].clientY;
  // // return {
  //     x : e.clientX - this.canvas.offsetLeft + (document.body.scrollLeft || document.documentElement.scrollLeft),
  //     y : e.clientY - this.canvas.offsetTop  + (document.body.scrollTop || document.documentElement.scrollTop)
  // }
  return {
    x : x - this.canvas.offsetLeft + (document.body.scrollLeft || document.documentElement.scrollLeft),
    y : y - this.canvas.offsetTop  + (document.body.scrollTop || document.documentElement.scrollTop)
  }
}
Brush.prototype.distance = function (a,b)
{
  let x = b.x-a.x , y = b.y-a.y;
  return Math.sqrt(x*x+y*y);
}
