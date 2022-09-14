import { Actor, CollisionType, Color, CompositeCollider, Polygon, Raster, Rectangle, Shape, vec } from 'excalibur';
import { Resources } from '../../resources';

const truckCollider = new CompositeCollider([
    Shape.Box(240, 80, vec(.5, 0)),
    Shape.Box(80, 80, vec(1.5, 1),)
])

class TruckBody extends Polygon {
  constructor() {
    super({
      points: [
        vec(0,0),
        vec(80,0),
        vec(80,80),
        vec(240,80),
        vec(240,160),
        vec(0,160),
        vec(0, 80)
      ],
      color: new Color(232, 72, 85)
    });
  }
}

export class Truck extends Actor {
  constructor(
    gameWidth: number,
    gameHeight: number
  ) {
    super({
      pos: vec(gameWidth, gameHeight - 100),
      width: 300,
      height: 80,
      collider: truckCollider,
    });
  }

  onInitialize() {

    const truckBody = new TruckBody
    this.graphics.use(truckBody);

    this.body.collisionType = CollisionType.Fixed
    this.body.bounciness = 0.05;
    this.vel = vec(-20, 0)
  }
}
