import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `    
    <canvas #theCanvas width="500" height="500">
      Canvas is not supported on this device...
    </canvas>
  `,
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('theCanvas') theCanvas;
  @ViewChild('rubberBand') rubberBand;

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
    this.canvas = this.theCanvas.nativeElement;
    this.context = this.canvas.getContext('2d');
  }
}
