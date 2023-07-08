function createDie(
  name,
  numDice = 1,
  numSides = 6,
  modifier = 0,
  fnRoll = rollDie
) {
  const die = {
    name: name,
    numDice: numDice,
    numSides: numSides,
    modifier: modifier,
    roll: fnRoll,
  };

  return die;
}

function rollDie() {
  let rollTotal = 0;
  for (let i = 0; i < this.numDice; i += 1) {
    rollTotal += Math.floor(Math.random() * this.numSides) + 1;
  }

  return rollTotal;
}

function roll1000(dice) {
  const diceRollResults = [];
  for (const die of dice) {
    diceRollResults[die.name] = 0;
  }

  for (let i = 0; i < 1000; i += 1) {
    for (const die of dice) {
      diceRollResults[die.name] += die.roll();
    }
  }

  return diceRollResults;
}

function logRollResults(dice, rolls) {
  for (const die of dice) {
    console.log(die.name, rolls[die.name] / 1000);
  }
}

function bloodcurse(numRounds = 5) {
  function protoBloodCurse() {
    let hitTotal = 0;

    let highest = 0;
    let persistent = 0;

    for (let i = 0; i < numRounds; i += 1) {
      for (let i = 0; i < this.numDice; i += 1) {
        hitTotal += Math.floor(Math.random() * this.numSides) + 1;
      }
    }

    for (let i = 0; i < numRounds; i += 1) {
      let persTotal = 0;
      for (let i = 0; i < this.numDice; i += 1) {
        persTotal += Math.floor(Math.random() * this.numSides) + 1;
      }

      if (persTotal > highest) {
        highest = persTotal;
      }
      persistent += highest;
    }

    return hitTotal + persistent;
  }

  return protoBloodCurse;
}

// debugger;
let innerRadianceTorrent1 = createDie("IRT 1 round", 24, 4);
let innerRadianceTorrent2 = createDie("IRT 2 rounds", 48, 4);
let bloodCurse1 = createDie("Bloodcurse 1 round", 4, 6, 0, bloodcurse(1));
let bloodCurse2 = createDie("Bloodcurse 2 rounds", 4, 6, 0, bloodcurse(2));
let bloodCurse3 = createDie("Bloodcurse 3 rounds", 4, 6, 0, bloodcurse(3));
let bloodCurse4 = createDie("Bloodcurse 4 rounds", 4, 6, 0, bloodcurse(4));
let bloodCurse5 = createDie("Bloodcurse 5 rounds", 4, 6, 0, bloodcurse(5));
let dice = [
  innerRadianceTorrent1,
  innerRadianceTorrent2,
  bloodCurse1,
  bloodCurse2,
  bloodCurse3,
  bloodCurse4,
  bloodCurse5,
];
let results = roll1000(dice);

logRollResults(dice, results);
