import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-clock',
  template: `
    <canvas #theCanvas width="500" height="500">
      Canvas is not supported on this device...
    </canvas>
  `,
  styles: []
})

export class ClockComponent implements OnInit {
  @ViewChild('theCanvas') theCanvas: ElementRef;

  private canvas;
  private context: CanvasRenderingContext2D;

  private FONT_HEIGHT = 15;
  private MARGIN = 35;
  private HAND_TRUNCATION;
  private HOUR_HAND_TRUNCATION;
  private NUMERAL_SPACING = 20;
  private RADIUS;
  private HAND_RADIUS;

  constructor() { }

  ngOnInit() {
    this.canvas = this.theCanvas.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.context.font = this.FONT_HEIGHT + 'px Arial';
    this.HAND_TRUNCATION =  this.canvas.width/25;
    this.HOUR_HAND_TRUNCATION = this.canvas.width/10;
    this.NUMERAL_SPACING = 20;
    this.RADIUS = this.canvas.width / 2 - this.MARGIN;
    this.HAND_RADIUS = this.RADIUS + this.NUMERAL_SPACING;
    setInterval(()=>{this.drawClock();},1000);
  }

//------------------Functions----------------------------

  drawCircle() {
  this.context.beginPath();
  this.context.arc(this.canvas.width/2,this.canvas.height/2,this.RADIUS,0,Math.PI*2,true);
  this.context.stroke();
}

  drawNumeral() {
    let self = this;
    let numerals = [1,2,3,4,5,6,7,8,9,10,11,12],
    angle = 0,
    numeralWidth = 0;

  numerals.forEach(function (numeral) {
    angle = Math.PI/6 * (numeral -3);
    numeralWidth = self.context.measureText(numeral.toString()).width;
    self.context.fillText(numeral.toString(),self.canvas.width/2 + Math.cos(angle)*(self.HAND_RADIUS)- numeralWidth/2,
      self.canvas.height/2 + Math.sin(angle)*(self.HAND_RADIUS)+ self.FONT_HEIGHT/3);
  });
}

  drawCenter() {
    this.context.beginPath();
    this.context.arc(this.canvas.width/2,this.canvas.height/2,5,0,Math.PI*2,true);
    this.context.fill();
}

  drawHand(loc, isHour) {
  let angle = (Math.PI*2)*(loc/60) - Math.PI/2,
    handRadius = isHour?this.RADIUS - this.HAND_TRUNCATION - this.HOUR_HAND_TRUNCATION:this.RADIUS-this.HAND_TRUNCATION;
    this.context.moveTo(this.canvas.width/2,this.canvas.height/2);
    this.context.lineTo(this.canvas.width/2 + Math.cos(angle) * handRadius,
      this.canvas.width/2 + Math.sin(angle) * handRadius);
    this.context.stroke();
}

  drawHands() {
  let date = new Date(),
    hour = date.getHours();
  hour = hour > 12?hour - 12:hour;
    this.drawHand(hour*5+(date.getMinutes()/60),true);
    this.drawHand(date.getMinutes(),false);
    this.drawHand(date.getSeconds(),false);
}

  drawClock() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawCircle();
    this.drawNumeral();
    this.drawCenter();
    this.drawHands();
  }
}
