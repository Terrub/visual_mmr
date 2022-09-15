import { Utils } from "./utils.js";
import { Display } from "./actors/display.js";
import { Dice } from "./dice.js";
import { DieRollDisplay } from "./dieRollDisplay.js";

function createCanvas(width, height) {
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  return canvas;
}

function averageRoll(roll) {
  let total = 0;
  for (const result of roll) {
    total += result;
  }
  // console.log(`Rolled ${die.numDice} d${die.numSides}: [${roll.join(", ")}]`);
  return Math.floor(total / roll.length);
}

function dd5eAdvantage(roll) {
  return Math.max(...roll);
}

function dd5eDisadvantage(roll) {
  return Math.min(...roll);
}

function leastLeaning(roll) {
  roll.sort((a, b) => a - b);
  return Math.round((roll[0] + roll[1]) / 2);
}

function mostLeaning(roll) {
  roll.sort((a, b) => b - a);
  return Math.round((roll[0] + roll[1]) / 2);
}

function sumRoll(roll) {
  const sum = roll.reduce((prev, curr) => prev + curr);
  return sum;
}

function getDiceRollData(die, numRolls, fnOutcome) {
  const diceRollData = [];
  for (let i = 0; i < numRolls; i += 1) {
    const roll = die.roll();
    const outcome = fnOutcome(roll);
    if (Utils.isUndefined(diceRollData[outcome - 1])) {
      diceRollData[outcome - 1] = 1;
    } else {
      diceRollData[outcome - 1] += 1;
    }
  }

  return diceRollData;
}

function getRandomColor() {
  const hue = Utils.generateRandomNumber(0, 361);
  const lum = Utils.generateRandomNumber(40, 71);

  return `hsl(${hue}, 100%, ${lum}%)`;
}

function drawDiceRolls(diceRolls, glib) {
  const graphWidth = 240;
  const graphHeight = 240;
  const margin = 10;
  const graphSpaces = Math.floor(window.innerWidth / (graphWidth + margin));
  for (let i = 0; i < diceRolls.length; i += 1) {
    const row = diceRolls[i];
    const dice = row.dice;
    const data = getDiceRollData(dice, 99999, row.func);
    const x = (graphWidth + margin) * (i % graphSpaces);
    const y = (1 + Math.floor(i / graphSpaces)) * (graphHeight + margin);
    const graph = new DieRollDisplay(
      glib,
      x,
      y,
      graphWidth,
      graphHeight,
      getRandomColor()
    );
    graph.show(data);
  }
}

const canvas = createCanvas(window.innerWidth, window.innerHeight);
const display = new Display(
  canvas.getContext("2d"),
  canvas.width,
  canvas.height
);
document.body.appendChild(canvas);

// debugger;
const provideDiceRollData = [
  {
    dice: new Dice(1, 20, 0),
    func: averageRoll,
  },
  {
    dice: new Dice(2, 20, 0),
    func: averageRoll,
  },
  {
    dice: new Dice(3, 20, 0),
    func: averageRoll,
  },
  {
    dice: new Dice(2, 20, 0),
    func: dd5eAdvantage,
  },
  {
    dice: new Dice(2, 20, 0),
    func: dd5eDisadvantage,
  },
  {
    dice: new Dice(3, 20, 0),
    func: leastLeaning,
  },
  {
    dice: new Dice(3, 20, 0),
    func: mostLeaning,
  },
  // ----
  {
    dice: new Dice(1, 6, 0),
    func: sumRoll,
  },
  {
    dice: new Dice(2, 6, 0),
    func: sumRoll,
  },
  {
    dice: new Dice(3, 6, 0),
    func: sumRoll,
  },
  {
    dice: new Dice(4, 6, 0),
    func: sumRoll,
  },
  {
    dice: new Dice(5, 6, 0),
    func: sumRoll,
  },
  {
    dice: new Dice(6, 6, 0),
    func: sumRoll,
  },
  {
    dice: new Dice(7, 6, 0),
    func: sumRoll,
  },
  // ----
  {
    dice: new Dice(1, 12, 0),
    func: sumRoll,
  },
  {
    dice: new Dice(2, 12, 0),
    func: sumRoll,
  },
  {
    dice: new Dice(3, 12, 0),
    func: sumRoll,
  },
  {
    dice: new Dice(4, 12, 0),
    func: sumRoll,
  },
  {
    dice: new Dice(5, 12, 0),
    func: sumRoll,
  },
  {
    dice: new Dice(6, 12, 0),
    func: sumRoll,
  },
  {
    dice: new Dice(7, 12, 0),
    func: sumRoll,
  },
];

drawDiceRolls(provideDiceRollData, display);
