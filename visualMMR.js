import { CertaintyGraph } from "./actors/certaintyGraph.js";
import { EstimationGraph } from "./actors/estimationGraph.js";
import { Display } from "./actors/display.js";
import { createMainloop } from "./actors/mainloop.js";
import { Player } from "./actors/player.js";
import { Utils } from "./utils.js";

function createCanvas(width, height) {
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  return canvas;
}

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

function createPlayerGraph(width, height, numUnits) {
  const randomName = getRandomName();
  const rating = Math.random();
  const deviance = Math.random();

  const player = new Player(display, randomName, rating, deviance);
  const graph = new CertaintyGraph(display, width, height, numUnits);

  return {
    player: player,
    graph: graph,
  };
}

function createPlayerGraphs(pNumPlayers) {
  const n = pNumPlayers;
  const playerGraphs = [];

  for (let i = 0; i < n; i += 1) {
    const playerGraph = createPlayerGraph(1200, 800, 200);
    playerGraph.graph.x = 10;
    playerGraph.graph.y = 10;
    playerGraphs.push(playerGraph);
  }

  return playerGraphs;
}

function createEstimationGraphs(playerGraphs) {
  const estimationGraphs = [];
  for (const playerGraph of playerGraphs) {
    const estimationGraph = new EstimationGraph(playerGraph.player);
  }

  return estimationGraphs;
}

function addNewPlayerData(pPlayerGraphs) {
  for (const playerGraph of pPlayerGraphs) {
    const newScore = playerGraph.player.getScore();

    playerGraph.graph.addScore(newScore);
  }
}

function checkForNextRound() {
  const curTime = Utils.getTime();

  if (oldTime + timePerRound < curTime) {
    round += 1;

    oldTime = curTime;
  }
}

function clear() {
  display.clear();
}

function draw() {
  const n = playerGraphs.length;
  for (let i = 0; i < n; i += 1) {
    const playerGraph = playerGraphs[i];

    playerGraph.graph.draw();
    const color = playerGraph.graph.colors.curve;
    const x = 1210;
    const y = 10 + (i * 20);

    playerGraph.player.draw(color, x, y);
  }
}

function renderFrame() {
  checkForNextRound();

  if (round > oldRound) {
    oldRound = round;

    addNewPlayerData(playerGraphs);
  }

  clear();
  draw();
}

let round = 0;
let oldRound = 0;
let oldTime = Utils.getTime();
let timePerRound = 1; // 1 millisecond

const canvas = createCanvas(window.innerWidth - 4, window.innerHeight - 4);
const display = new Display(
  canvas.getContext("2d"),
  canvas.width,
  canvas.height
);

const mainloop = createMainloop(renderFrame);

document.body.appendChild(canvas);

const playerGraphs = createPlayerGraphs(2);
const estimationGraphs = createEstimationGraphs(playerGraphs);

// debugger;
mainloop.start();
