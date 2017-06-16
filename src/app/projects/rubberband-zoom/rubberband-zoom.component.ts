import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-rubberband-zoom',
  template: `
    <div>
      <button id="btnReset" (click)="resetZoom()">Reset Zoom</button>
    </div>
    <div id="rubberBand" #rubberBand class="rubberBand"></div>
    <canvas #theCanvas width="500" height="500">
      Canvas is not supported on this device...
    </canvas>
  `,
  styleUrls: ['./rubberband-zoom.component.css']
})
export class RubberbandZoomComponent implements OnInit {
  @ViewChild('theCanvas') theCanvas;
  @ViewChild('rubberBand') rubberBand;

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private rBand: HTMLDivElement;
  private image;
  private mouseDown;
  private rBandRec;
  private dragging: boolean;

  constructor() { }

  ngOnInit() {
    this.canvas = this.theCanvas.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.rBand = this.rubberBand.nativeElement;
    this.image = new Image();
    this.image.src = '../../assets/img/5.jpg';
    this.mouseDown = {x: 0,y: 0};
    this.rBandRec = {x: 0, y: 0, w: 0, h: 0};
    this.dragging = false;

    this.canvas.onmousedown = (e)=>{
      e.preventDefault();
      this.rubberBandStart(e.clientX,e.clientY);
    };

    window.onmousemove = (e)=>{
      e.preventDefault();
      if(this.dragging){
        this.rubberBandStretch(e.clientX,e.clientY);
      }
    };

    window.onmouseup = (e)=> {
      e.preventDefault();
      this.rubberBandEnd();
    };

    this.image.onload = (e)=>{
      this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height);
    };
  }

  resetZoom(x:number,y:number){
    this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height);
    this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height);
  }

  rubberBandStart(x:number,y:number){
    this.mouseDown.x = x;
    this.mouseDown.y = y;

    this.rBandRec.x = this.mouseDown.x;
    this.rBandRec.y = this.mouseDown.y;

    this.moveRubberbandDiv();
    this.showRubberbandDiv();

    this.dragging = true;
  }

  rubberBandStretch(x:number,y:number){
    this.rBandRec.x = x < this.mouseDown.x?x:this.mouseDown.x;
    this.rBandRec.y = y < this.mouseDown.y?y:this.mouseDown.y;

    this.rBandRec.w = Math.abs(x - this.mouseDown.x);
    this.rBandRec.h = Math.abs(y - this.mouseDown.y);

    this.moveRubberbandDiv();
    this.resizeRubberbandDiv();
  }

  rubberBandEnd(){
    this.rBand.style.width = '0';
    this.rBand.style.height = '0';

    this.hideRubberbandDiv();

    this.dragging = false;
  }

  moveRubberbandDiv(){
    this.rBand.style.top = this.rBandRec.y + 'px';
    this.rBand.style.left = this.rBandRec.x + 'px';
  }

  resizeRubberbandDiv(){
    this.rBand.style.width = this.rBandRec.w - 2 + 'px';
    this.rBand.style.height = this.rBandRec.h -2 + 'px';
  }

  showRubberbandDiv(){
    this.rBand.style.display = 'inline';
  }

  hideRubberbandDiv(){
    this.rBand.style.display = 'none';
  }

  resetRubberbandRectangle(){
    this.rBandRec = {x:0,y:0,w:0,h:0};
  }
}
