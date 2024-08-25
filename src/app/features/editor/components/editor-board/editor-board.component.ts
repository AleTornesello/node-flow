import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {BoardScaleOptions} from "../../models/board-scale.model";

@Component({
  selector: 'app-editor-board',
  templateUrl: './editor-board.component.html',
  styleUrl: './editor-board.component.scss'
})
export class EditorBoardComponent {
  @ViewChild('wrapper') wrapper?: ElementRef<HTMLDivElement>;
  @ViewChild('board') board?: ElementRef<HTMLDivElement>;
  @Input() scaleOptions: BoardScaleOptions;

  protected dragging: boolean;

  private scale: number;
  private position: { x: number, y: number };
  private clickPosition: { x: number, y: number };

  constructor() {
    this.scale = 1;
    this.position = {x: 0, y: 0};
    this.clickPosition = {x: -1, y: -1};
    this.scaleOptions = new BoardScaleOptions();
    this.dragging = false;
  }

  public onWheel(event: WheelEvent) {
    if (!this.board || !this.wrapper) {
      return;
    }

    // Prevent the browser from scrolling
    event.preventDefault();

    const zoomPointX = event.pageX - this.wrapper.nativeElement.offsetLeft;
    const zoomPointY = event.pageY - this.wrapper.nativeElement.offsetTop;

    // Get the scroll direction
    // Cap the delta to [-1,1] for cross browser consistency
    let delta = Math.max(-1, Math.min(1, -event.deltaY));

    // Determine the point on where the slide is zoomed in
    const zoomTargetX = (zoomPointX - this.position.x) / this.scale;
    const zoomTargetY = (zoomPointY - this.position.y) / this.scale;

    // Apply zoom
    this.scale += delta * this.scaleOptions.scaleFactor;
    this.scale = Math.max(this.scaleOptions.scaleLowerBound, Math.min(this.scaleOptions.scaleUpperBound, this.scale));

    // Calculate x and y based on zoom
    this.position.x = -zoomTargetX * this.scale + zoomPointX;
    this.position.y = -zoomTargetY * this.scale + zoomPointY;

    this.update();
  }

  public onMouseDown(event: MouseEvent) {
    this.dragging = true;
    this.clickPosition.x = event.x;
    this.clickPosition.y = event.y;
  }

  public onMouseUp() {
    this.dragging = false;
    this.clickPosition.x = -1;
    this.clickPosition.y = -1;
  }

  public onMouseMove(event: MouseEvent) {
    if (this.clickPosition.x === -1 || this.clickPosition.y === -1) {
      return;
    }

    if (!this.wrapper) {
      return;
    }

    const deltaX = -(event.x - this.clickPosition.x);
    const deltaY = -(event.y - this.clickPosition.y);

    this.clickPosition.x = event.x;
    this.clickPosition.y = event.y;

    this.wrapper.nativeElement.scrollBy(deltaX, deltaY);
  }

  private update() {
    if (!this.board) {
      return;
    }

    // Make sure the slide stays in its container area when zooming out
    if (this.position.x > 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.board.nativeElement.clientWidth * this.scale < this.board.nativeElement.clientWidth) {
      this.position.x = -this.board.nativeElement.clientWidth * (this.scale - 1);
    }
    if (this.position.y > 0) {
      this.position.y = 0;
    }
    if (this.position.y + this.board.nativeElement.clientHeight * this.scale < this.board.nativeElement.clientHeight) {
      this.position.y = -this.board.nativeElement.clientHeight * (this.scale - 1);
    }

    this.board.nativeElement.style.transform = `translate(${this.position.x}px,${this.position.y}px) scale(${this.scale},${this.scale})`;
  }
}
