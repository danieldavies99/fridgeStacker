import { Actor, CollisionStartEvent, CollisionType, Color, Entity, ExcaliburGraphicsContext, PreCollisionEvent, vec } from 'excalibur';
import { Resources } from '../../resources';
import { Truck } from '../truck/truck';
import { Fridge } from './fridge';
import { Fridge4x2 } from './fridge4x2';
import { Fridge4x4 } from './fridge4x4';
import { Fridge5x4 } from './fridge5x4';
import { StackCollider } from './stackCollider';

export class Fridge2x4  extends Actor implements Fridge {
  private hasLanded = false;

  private gameWidth: number;
  private gameHeight: number;

  private isStacked: boolean = false;
  private isBouncy: boolean = false;

  private stackCollider: StackCollider; 

  constructor(
    gameWidth: number,
    gameHeight: number,
    isBouncy: boolean
  ) {
    super({
      pos: vec(gameWidth / 2, 50),
      width: 64,
      height: 128,
    });
    this.isBouncy = isBouncy;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.stackCollider = new StackCollider(74, 138);
    this.addChild(this.stackCollider);
  }

  onInitialize() {
    this.graphics.use(Resources.Fridge2x4Variation1.toSprite());

    this.body.collisionType = CollisionType.Active
    this.body.bounciness = this.isBouncy ? 0.75 : 0.01;

    this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    this.on('precollision', (evt) => this.onPreCollision(evt));
    this.on('postupdate', (evt) => this.onPostUpdate());
  }

  onCollisionStart(evt: CollisionStartEvent) {
    if(evt.other instanceof StackCollider) { 
      return
    }
    this.land()
  }

  onPreCollision(evt: PreCollisionEvent) {
    if(evt.other instanceof Truck) {
      this.isStacked = true;
    }
    if(evt.other instanceof StackCollider) {
      // console.log(evt.other.parent)
      if(
        evt.other.parent instanceof Fridge2x4
        || evt.other.parent instanceof Fridge4x2
        || evt.other.parent instanceof Fridge4x4
        || evt.other.parent instanceof Fridge5x4
      ) {
        if(evt.other.parent.getIsStacked()) {
          this.isStacked = true;
        }
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
