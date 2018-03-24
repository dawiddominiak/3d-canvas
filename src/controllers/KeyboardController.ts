import { Camera } from '../model/Camera';
import { Space } from '../model/Space';
import { DrawingService } from '../services/DrawingService';
import { CityBuilder } from '../services/CityBuilder';

const KEYBOARD_MAPPING = { 37: 'left', 38: 'up', 39: 'right', 40: 'down' };

export class KeyboardController {
  constructor(
    private camera: Camera,
    private cityBuilder: CityBuilder,
    private drawingService: DrawingService,
  ) {
    this.drawingService.draw(this.cityBuilder.build(), this.camera);
    document.addEventListener('keydown', (e: KeyboardEvent) => this.keyDownHandler(e), false);
  }

  private keyDownHandler(event: KeyboardEvent) {
    const direction = this.getDirection(event);

    if (direction === 'left') {
      this.camera.moveLeft();
    }

    if (direction === 'right') {
      this.camera.moveRight();
    }

    if (direction === 'up') {
      this.camera.moveTop();
    }

    if (direction === 'down') {
      this.camera.moveBottom();
    }

    if (direction === 'forward') {
      this.camera.moveForward();
    }

    if (direction === 'back') {
      this.camera.moveBack();
    }

    this.drawingService.draw(this.cityBuilder.build(), this.camera);
  }

  private getDirection(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    let direction = null;

    switch (event.keyCode) {
      case 37:
        direction = 'left';
        break;
      case 38:
        direction = 'up';
        break;
      case 39:
        direction = 'right';
        break;
      case 40:
        direction = 'down';
        break;
      case 87:
        direction = 'forward';
        break;
      case 83:
        direction = 'back';
    }

    return direction;
  }
}
