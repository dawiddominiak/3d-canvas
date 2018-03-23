export class DrawingService {
  constructor(private canvas: HTMLCanvasElement) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  draw() {
    const context = this.canvas.getContext('2d');

    if (context === null) {
      throw new Error('No 2D context');
    }

    context.beginPath();
    context.moveTo(25, 25);
    context.lineTo(105, 25);
    context.stroke();
  }
}
