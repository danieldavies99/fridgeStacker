import { Actor } from "excalibur"

export interface Fridge extends Actor{
  snapLeft(): void
  snapRight(): void
  getHasLanded(): boolean
  land(): void
}