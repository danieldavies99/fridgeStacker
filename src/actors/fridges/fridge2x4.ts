import { Actor, CollisionType, Color, vec } from 'excalibur';
import { Resources } from '../../resources';
import { Fridge } from './fridge';

export class Fridge2x4  extends Actor implements Fridge {
  private hasLanded = false;

  private gameWidth: number;
  private gameHeight: number;

  private isStacked: boolean = false;
  private isBouncy: boolean = false;

  constructor(
    gameWidth: number,
    gameHeight: number,
    isBouncy: boolean,
  ) {
    let lightness = 255 - (255 * (Math.random() / 2));
    let color = isBouncy ? new Color(175, 162, 255) : new Color(lightness, lightness, lightness)
    super({
      pos: vec(gameWidth / 2, 50),
      width: 40,
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

    this.on("collisionstart", () => {
      this.land();
    })

    
    this.on("precollision", (evt) => {
      const collidingWith = evt.other.constructor.name;
      if(collidingWith === "Truck") {
        this.isStacked = true;
      }

      if(
        collidingWith === "Fridge2x4"
        || collidingWith === "Fridge4x2"
        || collidingWith === "Fridge4x4"
        || collidingWith === "Fridge5x4"
      ) {
        if(evt.other["isStacked"]) {
          this.isStacked = true
        }
      }
      // console.log(evt.other.constructor.name)
    })

    this.onPostUpdate = () => {
      this.isStacked = false;
      if(this.isOutOfBounds()) {
        this.land();
      }
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
