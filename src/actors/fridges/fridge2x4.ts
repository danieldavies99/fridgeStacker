import { Actor, CollisionStartEvent, CollisionType, PreCollisionEvent, vec } from 'excalibur';
import { Resources } from '../../resources';
import { TruckStackCollider } from '../truck/truckStackCollider';
import { Fridge } from './fridge';
import { Fridge4x2 } from './fridge4x2';
import { StackCollider } from './stackCollider';

export class Fridge2x4  extends Actor implements Fridge {
  private hasLanded = false;

  private gameWidth: number;
  private gameHeight: number;

  private isBouncy: boolean = false;
  private isStacked: boolean = false;

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
    this.body.bounciness = this.isBouncy ? 0.75 : 0;
    this.body.mass = 1;

    this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    this.on('precollision', (evt) => this.onPreCollision(evt));
    this.on('postupdate', (evt) => this.onPostUpdate());
  }

  onCollisionStart(evt: CollisionStartEvent) {
    if(evt.other instanceof StackCollider) { 
      return
    }
    this.land();
  }

  onPreCollision(evt: PreCollisionEvent) {
    if(evt.other instanceof TruckStackCollider) {
      this.isStacked = true;
    }

    if(evt.other instanceof StackCollider) {
      if(
        evt.other.parent instanceof Fridge2x4
        || evt.other.parent instanceof Fridge4x2
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
