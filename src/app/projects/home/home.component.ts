import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <canvas #theCanvas width="500" height="500">
      Canvas is not supported on this device...
    </canvas>
    <hr>
    <label #xPosLabel>X: </label><br>
    <label #yPosLabel>Y: </label>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  @ViewChild('theCanvas') theCanvas;
  @ViewChild('xPosLabel') xPosLabel;
  @ViewChild('yPosLabel') yPosLabel;

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private xPositionLabel: HTMLLabelElement;
  private yPositionLabel: HTMLLabelElement;

  constructor() { }

  ngOnInit() {
    this.canvas = this.theCanvas.nativeElement;
    this.xPositionLabel = this.xPosLabel.nativeElement;
    this.yPositionLabel = this.yPosLabel.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = '#cccccc';
    this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
    this.canvas.addEventListener('mousemove',(event)=>{this.showMessage(event);});
  }

  showMessage(e: MouseEvent){
    let x = e.clientX - Math.floor(this.canvas.getBoundingClientRect().left) ;
    let y = e.clientY - Math.floor(this.canvas.getBoundingClientRect().top);
    this.xPositionLabel.innerText = 'X: ' + x;
    this.yPositionLabel.innerText = 'Y: ' + y;
    this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
    this.drawHorizontalLine(y);
    this.drawVerticalLine(x);
  }

  drawHorizontalLine(verticalPosition: number){
    let leftBound = 0;
    let rigthBound = this.canvas.width;
    this.context.beginPath();
    this.context.moveTo(leftBound,verticalPosition);
    this.context.lineTo(rigthBound,verticalPosition);
    this.context.stroke();
  }

  drawVerticalLine(horizontalPosition: number){
    let topBound = 0;
    let bottomBound = this.canvas.height;
    this.context.beginPath();
    this.context.moveTo(horizontalPosition,topBound);
    this.context.lineTo(horizontalPosition,bottomBound);
    this.context.stroke();
  }
}
