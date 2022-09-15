import { Actor, Collider, CollisionStartEvent, CollisionType, Color, ExcaliburGraphicsContext, PolygonCollider, PreCollisionEvent, Shape, vec } from 'excalibur';
import { Resources } from '../../resources';
import { Truck } from '../truck/truck';
import { Fridge } from './fridge';
import { Fridge2x4 } from './fridge2x4';
import { Fridge4x4 } from './fridge4x4';
import { Fridge5x4 } from './fridge5x4';

export class Fridge4x2 extends Actor implements Fridge {
  private hasLanded = false;

  private gameWidth: number;
  private gameHeight: number;

  private isBouncy: boolean = false;
  private isStacked: boolean = false;

  constructor(
    gameWidth: number,
    gameHeight: number,
    isBouncy: boolean
  ) {
    super({
      pos: vec(gameWidth / 2, 50),
      width: 128,
      height: 64
    });
    this.isBouncy = isBouncy;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  onInitialize() {
    this.graphics.use(Resources.Fridge4x2Variation1.toSprite());

    this.body.collisionType = CollisionType.Active
    this.body.bounciness = this.isBouncy ? 0.75 : 0.01;

    this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    this.on('precollision', (evt) => this.onPreCollision(evt));
    this.on('postupdate', (evt) => this.onPostUpdate());
  }

  onCollisionStart(evt: CollisionStartEvent) {
    this.land();
  }

  onPreCollision(evt: PreCollisionEvent) {
    if(evt.other instanceof Truck) {
      this.isStacked = true;
    }

    if(
      evt.other instanceof Fridge2x4
      || evt.other instanceof Fridge4x2
      || evt.other instanceof Fridge4x4
      || evt.other instanceof Fridge5x4
    ) {
      if(evt.other.getIsStacked()) {
        this.isStacked = true;
      }
    }
  }

  onPostUpdate() {
    this.isStacked = false;
    if(this.isOutOfBounds()) {
      this.land();
    }
  }

  isOutOfBounds() {
    return this.pos.x > this.gameWidth || this.pos.x < 0 || this.pos.y > this.gameHeight || this.pos.y < 0;
  }

  snapLeft() {
    this.pos.x -= 40;
  }

  snapRight() {
    this.pos.x += 40;
  }

  land() {
    this.hasLanded = true;
  }

  getHasLanded(): boolean {
    return this.hasLanded
  }

  getIsStacked(): boolean {
    return this.isStacked;
  }
}
