import { CertaintyGraph } from "./actors/certaintyGraph.js";
import { createMainloop } from "./actors/mainloop.js";
import { Player } from "./actors/player.js";
import { PlayerGraph } from "./actors/playerGraph.js";
import { CanvasRenderer } from "./connectors/canvasRenderer.js";
import { Utils } from "./utils.js";

function getRandomName() {
  const names = [
    "Mawunyo",
    "Amund",
    "Lawal",
    "Pan",
    "Frea",
    "Damnat",
    "Nikon",
    "Dukvakha",
    "Pierre",
    "Ilija",
    "Helvius",
    "Piaras",
    "Sava",
    "Narayan",
    "Nereus",
  ];

  return names[Utils.generateRandomNumber(names.length, 0)];
}

function createPlayerGraphs(pNumPlayers) {
  const generatedNames = [];
  const maxAttempts = 10;

  let numAttempts = 0;

  while (generatedNames.length < pNumPlayers) {
    const randomName = getRandomName();
    numAttempts += 1;

    // Try again if this name is already taken and we have some attempts left
    if (generatedNames.includes(randomName) && maxAttempts >= numAttempts) {
      continue;
    }

    generatedNames.push(randomName);
    numAttempts = 0;
  }

  const playerGraphs = [];
  for (const name of generatedNames) {
    const rating = Math.random();
    const deviance = Math.random();
    const player = new Player(canvasRenderer, name, rating, deviance);
    const graph = new CertaintyGraph(canvasRenderer, 600, 300, 200);

    graph.x = 10;
    graph.y = 10;

    const playerGraph = new PlayerGraph(player, graph);

    playerGraphs.push(playerGraph);
  }

  return playerGraphs;
}

function getControlPoints(startX, startY, meanX, meanY, endX, endY, scale) {
  // Basic pythagorams:
  // √((meanX - startX)^2 + (meanY - startY)^2)
  const d01 = Math.sqrt(
    Math.pow(meanX - startX, 2) + Math.pow(meanY - startY, 2)
  );
  // √((endX - meanX)^2 + (endY - meanY)^2)
  const d12 = Math.sqrt(Math.pow(endX - meanX, 2) + Math.pow(endY - meanY, 2));

  // --- ?
  const fa = (scale * d01) / (d01 + d12); // scaling factor for triangle Ta
  const fb = (scale * d12) / (d01 + d12); // ditto for Tb, simplifies to fb=t-fa

  return {
    controlPoint1: {
      x: meanX - fa * (endX - startX),
      y: meanY - fa * (endY - startY),
    },
    controlPoint2: {
      x: meanX + fb * (endX - startX),
      y: meanY + fb * (endY - startY),
    },
  };
}

function addNewPlayerData(pPlayerGraphs) {
  for (const playerGraph of pPlayerGraphs) {
    const newScore = playerGraph.player.getScore();

    playerGraph.graph.addScore(newScore);
  }
}

function clear() {
  canvasRenderer.clear();
}

function draw() {
  const n = playerGraphs.length;
  for (let i = 0; i < n; i += 1) {
    const playerGraph = playerGraphs[i];
    playerGraph.draw(i);
  }

  // for (const graph of estimationGraphs) {
  //   graph.x = 300;
  //   graph.y = 300;
  //   graph.draw();
  // }
}

function renderFrame() {
  const curTime = Utils.getTime();

  if (curTime > oldTime + timePerRound) {
    round += 1;

    oldTime = curTime;
  }

  if (maxRounds < round) {
    mainloop.stop();
    return;
  }

  if (round > oldRound) {
    oldRound = round;
    console.log(`Starting round #${round}`);
    addNewPlayerData(playerGraphs);
  }

  clear();
  draw();
}

const timePerRound = 1; // milliseconds
const maxRounds = 1000;
let round = 0;
let oldRound = 0;
let oldTime = Utils.getTime();


const menuBar = document.createElement("div");
const testButton = document.createElement("a");
testButton.href = "tests.html";
testButton.text = "Tests";
menuBar.append(testButton);
document.body.appendChild(menuBar);

const content = document.createElement("div");
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
content.appendChild(canvas);
document.body.appendChild(content);

const canvasRenderer = new CanvasRenderer(canvas);

const mainloop = createMainloop(renderFrame);
const playerGraphs = createPlayerGraphs(20);

// debugger;
window.mainloop = mainloop;
mainloop.start();
// mainloop.next();
