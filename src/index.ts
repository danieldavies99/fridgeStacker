import { Engine, Loader, DisplayMode, Physics, vec, Color } from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { Resources } from './resources';
import { Fridge2x4 } from './actors/fridges/fridge2x4';
import { Truck } from './actors/truck/truck';
import { Fridge } from './actors/fridges/fridge';
import { Fridge4x2 } from './actors/fridges/fridge4x2';
import { Fridge4x4 } from './actors/fridges/fridge4x4';
import { Fridge5x4 } from './actors/fridges/fridge5x4';
import { ScoreIndicator } from './actors/scoreIndicator/scoreIndicator';


/**
 * Managed game class
 */
class Game extends Engine {
  private scoreIndicator: ScoreIndicator;
  private fridges: Fridge[] = [];
  private truck: Truck;

  private levelOne: LevelOne;

  private newFridgeQueued: boolean = false;

  constructor() {
    super({
      displayMode: DisplayMode.FitScreen,
      suppressPlayButton: true,
      backgroundColor: new Color(43,58,103)
    });
  }

  private spawnNewFridge() {
    this.newFridgeQueued = false;
    const rand = Math.random();
    const shouldBounce = Math.random() < 0.1;
    let fridge: Fridge;
    if(rand < 0.33) {
      fridge = new Fridge2x4(
        this.drawWidth,
        this.drawHeight,
        shouldBounce
    );
    } else if (rand < 0.66 ) {
      fridge = new Fridge4x2(
        this.drawWidth,
        this.drawHeight,
        shouldBounce
      );
    } else {
      fridge = new Fridge4x4(
        this.drawWidth,
        this.drawHeight,
        shouldBounce
      );
    }
    // else {
    //   fridge = new Fridge5x4(
    //     this.drawWidth,
    //     this.drawHeight,
    //     shouldBounce
    //   )
    // }
    this.fridges.push(fridge);
    this.levelOne.add(this.fridges[this.fridges.length - 1])
  }

  private getCurrentFridge(): Fridge {
    const newFridge = this.fridges[this.fridges.length - 1];
    return newFridge;
  }

  public start() {

    // Create new scene with a fridge
    this.levelOne = new LevelOne();

    this.spawnNewFridge();
  
    this.truck = new Truck(this.drawWidth, this.drawHeight);
    this.levelOne.add(this.truck);

    this.scoreIndicator = new ScoreIndicator(this.drawWidth, this.drawHeight);
    this.levelOne.add(this.scoreIndicator);

    game.input.keyboard.on("press", (evt) => {
      if (
        (evt.key === "ArrowLeft" || evt.key === "KeyA")
        && !this.getCurrentFridge().getHasLanded()
      ) {
        this.getCurrentFridge().snapLeft();
      }

      if (
        (evt.key === "ArrowRight" || evt.key === "KeyD")
        && !this.getCurrentFridge().getHasLanded()
      ) {
        this.getCurrentFridge().snapRight();
      }
    })

    game.add('levelOne', this.levelOne);

    // Automatically load all default resources
    // const loader = new Loader(Object.values(Resources));

    this.levelOne.onPostUpdate = () => {
      if (this.getCurrentFridge().getHasLanded() && !this.newFridgeQueued) {
        this.newFridgeQueued = true;
        setTimeout(() => {
          this.spawnNewFridge();
        }, (1000));
      }
      
      let numStacked = 0;
      this.fridges.forEach( fridge => {
        if(fridge.getIsStacked() === true) {
          numStacked++;
        }
      })
      this.scoreIndicator.setNumStacked(numStacked)
    }

    return super.start();
  }
}

const game = new Game();
Physics.useRealisticPhysics();
Physics.acc = vec(0, 200);

game.start().then(() => {
  game.goToScene('levelOne');
});
