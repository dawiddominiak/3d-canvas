import { Camera } from "../model/Camera";
import { Space } from "../model/Space";
import { CityBuilder } from "../services/CityBuilder";
import { DrawingService } from "../services/DrawingService";

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
      70: this.camera.yawRight,
      72: this.camera.yawLeft,
      84: this.camera.pitchDown,
      71: this.camera.pitchUp,
      82: this.camera.rollLeft,
      89: this.camera.rollRight,
      189: this.camera.zoomOut,
      187: this.camera.zoomIn,
    };

    if (directionsMap[keyCode]) {
      directionsMap[keyCode].call(this.camera);
    }
  }
}
