import { ImageSource } from 'excalibur';
import sword from './images/sword.png';
import fridge2x4Variation1 from './images/Fridge2x4Variation1.png';
import fridge4x2Variation1 from './images/Fridge4x2Variation1.png';

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
    Sword: new ImageSource(sword),
    Fridge2x4Variation1: new ImageSource(fridge2x4Variation1),
    Fridge4x2Variation1: new ImageSource(fridge4x2Variation1)
}

export { Resources }
