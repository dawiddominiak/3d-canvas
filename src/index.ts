import { drawingService } from './kernel/assembler';
import { space as city } from './fixtures/city';
import { Camera } from './model/Camera';
import { Point } from './model/Point';

drawingService.draw(city, new Camera(new Point(0, 0, 0)));
