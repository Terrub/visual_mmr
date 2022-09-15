import { CertaintyGraph } from "./actors/certaintyGraph.js";
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

function createPlayerGraph(width, height, numUnits) {
  const player = new Player(Math.random(), Math.random());
  const graph = new CertaintyGraph(display, width, height, numUnits);

  return {
    player: player,
    graph: graph,
  };
}

function createPlayerGraphs(p_num_players) {
  const n = p_num_players;
  const playerGraphs = [];

  for (let i = 0; i < n; i += 1) {
    playerGraphs.push(createPlayerGraph(600, 800, 200));
  }

  return playerGraphs;
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
  let concurrent_x = 10;
  let concurrent_y = 10;

  // Allow all objects to update themselves. Top-down approach
  for (let i = 0; i < n; i += 1) {
    const ren_ob = renderObjects[i];

    if (ren_ob.properties_have_changed) {
      ren_ob.update(ren_ob);
    }
  }

  // Allow all objects to measure themselves. Bottom-up approach
  for (let i = n - 1; i >= 0; i -= 1) {
    const ren_ob = renderObjects[i];

    if (ren_ob.dimensionsHaveChanged) {
      ren_ob.measure(ren_ob);
    }
  }

  // Allow all objects to display themselves. Top-down approach
  for (let i = 0; i < n; i += 1) {
    const ren_ob = renderObjects[i];

    ren_ob.x = concurrent_x;
    ren_ob.y = concurrent_y;

    ren_ob.draw(ren_ob);

    //*

    //@HACK: I needed the first 2 buttons to go horizontal for now!
    if (i < 2) {
      concurrent_x += ren_ob.w + 10;
    } else {
      concurrent_x = 10;
    }

    /*/
        concurrent_x = 10;
    //*/
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

// framerate = RenderableFramerate.create(display);
// renderObjects.push(framerate);

const playerGraphs = createPlayerGraphs(1);
renderObjects = renderObjects.concat(playerGraphs);

hookMousePositions();
hookMouseClick(mainloop);

debugger;
mainloop.start();
