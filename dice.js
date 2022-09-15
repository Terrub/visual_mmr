import { Utils } from "../utils.js";

export class Dice {
  numDice;
  numSides;
  modifier;

  constructor(numDice, numSides, modifier) {
    this.numDice = numDice;
    this.numSides = numSides;
    this.modifier = modifier;
  }

  roll() {
    let total = [];
    for (let numRolls = 0; numRolls < this.numDice; numRolls += 1) {
      total.push(Utils.generateRandomNumber(this.numSides + 1, 1) + this.modifier);
    }

    return total;
  }

  getNumDice() {
    return this.numDice;
  }
}
