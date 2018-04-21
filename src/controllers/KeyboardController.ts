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
    localStorage.setItem('hideEdges', 'false');
    document.addEventListener('keydown', (e: KeyboardEvent) => this.keyDownHandler(e), false);
  }

  private keyDownHandler(event: KeyboardEvent) {
    if (event.keyCode === 16) {
      const hideEdges = localStorage.getItem('hideEdges');
      if (!hideEdges || hideEdges === 'false') {
        localStorage.setItem('hideEdges', 'true');
      } else {
        localStorage.setItem('hideEdges', 'false');
      }
    }
    this.doMovement(event);
    this.drawingService.draw(this.cityBuilder.build(), this.camera);
  }

  private doMovement(event: KeyboardEvent) {
    const keyCode = event.keyCode;

    const directionsMap: {[key:string]:Function} = {
      37: this.camera.moveLeft,
      38: this.camera.moveTop,
      39: this.camera.moveRight,
      40: this.camera.moveBottom,
      87: this.camera.moveForward,
      83: this.camera.moveBack,
      70: this.camera.rotateOYBackward,
      72: this.camera.rotateOYForward,
      84: this.camera.rotateOXForward,
      71: this.camera.rotateOXBackward,
      82: this.camera.rotateOZBackward,
      89: this.camera.rotateOZForward,
      189: this.camera.zoomOut,
      187: this.camera.zoomIn,
    };

    if (directionsMap[keyCode]) {
      directionsMap[keyCode].call(this.camera);
    }
  }
}
