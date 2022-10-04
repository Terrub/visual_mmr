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

function createPlayerGraphs(pNumPlayers) {
  const names = [];
  while(names.length < pNumPlayers) {
    const randomName = getRandomName();
    if (!names.includes(randomName)) {
      names.push(randomName);
    }
  }

  const playerGraphs = []; 
  for (const name of names) {
    const rating = Math.random();
    const deviance = Math.random();    
    const player = new Player(display, name, rating, deviance);
    const graph = new CertaintyGraph(display, 1200, 800, 200);
    
    graph.x = 10;
    graph.y = 10;
    
    playerGraphs.push({
      player: player,
      graph: graph,
    });
  }

  return playerGraphs;
}

function createEstimationGraphs(playerGraphs) {
  const estimationGraphs = [];
  for (const playerGraph of playerGraphs) {
    // const estimationGraph = new EstimationGraph(playerGraph.player);
    const estimationGraph = new EstimationGraph(display, 200, 100);
    estimationGraphs.push(estimationGraph);
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
    const y = 10 + i * 20;

    playerGraph.player.draw(color, x, y);
  }

  // for (const graph of estimationGraphs) {
  //   graph.x = 300;
  //   graph.y = 300;
  //   graph.draw();
  // }
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
