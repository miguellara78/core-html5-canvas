import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-mouse-coordinates',
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
export class MouseCoordinatesComponent implements OnInit {

  @ViewChild('theCanvas') theCanvas;
  @ViewChild('xPosLabel') xPosLabel;
  @ViewChild('yPosLabel') yPosLabel;

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private xPositionLabel: HTMLLabelElement;
  private yPositionLabel: HTMLLabelElement;
  private spriteSheet = new Image();

  constructor() { }

  ngOnInit() {
    this.canvas = this.theCanvas.nativeElement;
    this.xPositionLabel = this.xPosLabel.nativeElement;
    this.yPositionLabel = this.yPosLabel.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.canvas.addEventListener('mousemove',(event)=>{this.showMessage(event);});
    this.drawBG();
    this.spriteSheet.src = '../../assets/img/sprites.png';
    this.spriteSheet.onload =  (e)=>{this.drawImage()};
  }

  showMessage(e: MouseEvent){
    let x = e.clientX - Math.floor(this.canvas.getBoundingClientRect().left) ;
    let y = e.clientY - Math.floor(this.canvas.getBoundingClientRect().top);
    this.xPositionLabel.innerText = 'X: ' + x;
    this.yPositionLabel.innerText = 'Y: ' + y;
    this.drawBG();
    this.drawImage();
    this.drawGuideLines(x,y);
  }

  drawImage(){
    this.context.drawImage(this.spriteSheet,0,0);
  }

  drawBG(){
    const vertical_line_spacing = 12;
    let height = this.canvas.height;
    let width = this.canvas.width;

    this.context.clearRect(0,0,width,height);
    this.context.strokeStyle = '#bbbbbb';
    this.context.lineWidth = 0.5;

    while(height > vertical_line_spacing * 4){
      this.context.beginPath();
      this.context.moveTo(0,height);
      this.context.lineTo(width,height);
      this.context.stroke();
      height -= vertical_line_spacing;
    }
  }

  drawGuideLines(x: number,y: number){
    this.context.strokeStyle = '#00d6e3';
    this.context.lineWidth = 0.5;
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
