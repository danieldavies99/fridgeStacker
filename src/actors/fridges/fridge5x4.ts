import { Actor, CollisionStartEvent, CollisionType, Color, PreCollisionEvent, vec } from 'excalibur';
import { Truck } from '../truck/truck';
import { Fridge } from './fridge';
import { Fridge2x4 } from './fridge2x4';
import { Fridge4x2 } from './fridge4x2';
import { Fridge4x4 } from './fridge4x4';

export class Fridge5x4 extends Actor implements Fridge {
  private hasLanded = false;

  private gameWidth: number;
  private gameHeight: number;

  private isBouncy: boolean = false;
  private isStacked: boolean = false;

  constructor(
    gameWidth: number,
    gameHeight: number,
    isBouncy: boolean,
  ) {
    let lightness = 255 - (255 * (Math.random() / 2));
    let color = isBouncy ? new Color(175, 162, 255) : new Color(lightness, lightness, lightness)
    super({
      pos: vec(gameWidth / 2, 50),
      width: 100,
      height: 80,
      color: color
    });
    this.isBouncy = isBouncy;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  onInitialize() {
    this.body.collisionType = CollisionType.Active
    this.body.bounciness = this.isBouncy ? 0.75 : 0.05;

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
