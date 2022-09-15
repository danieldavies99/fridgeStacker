import { Actor, Color, Font, vec, Text } from 'excalibur';
import { Resources } from '../../resources';

export class ScoreText extends Text {
  constructor(num) {
    super({
      text: "Fridges Stacked: " + num,
      font: new Font({
        size: 30,
        color: new Color(255, 255, 255)
      })
    })
  }
}

export class ScoreIndicator extends Actor {
  private scoreText: ScoreText;
  private numStacked: number = 0;

  constructor(gameWidth: number, gameHeight: number) {
    super({
      pos: vec(gameWidth / 2, 150),
    });
  }

  onInitialize() {
    this.scoreText = new ScoreText(0);
    this.graphics.use(this.scoreText)
  }

  setNumStacked(num: number) {
    if(num !== this.numStacked) {
      const newText = new ScoreText(num)
      this.graphics.use(newText)
    }
    this.numStacked = num;
  }
}
