import { Actor, Color } from "excalibur";

// Stack Collider should be slightly larger than the fridge
// it is the child of, this is to add a slight deadzone
// to fridge collision detection
export class TruckStackCollider extends Actor {
  constructor(width: number, height: number) {
    super({
      width: width,
      height: height,
      color: new Color(255,255,0),
    })
    this.graphics.opacity = 0.0
    ;
  }
}