import { CertaintyGraph } from "./actors/certaintyGraph.js";
import { Display } from "./actors/display.js";
import { createMainloop } from "./actors/mainloop.js";
import { Player } from "./actors/player.js";
import { RenderableButton } from "./actors/renderableButton.js";
import { RenderObject } from "./actors/renderObject.js";
import { Utils } from "./utils.js";

function createCanvas(width, height) {
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  return canvas;
}

function createPlayerGraph(width, height, numUnits) {
  var player = new Player(Math.random(), Math.random());
  var graph = new CertaintyGraph(display, width, height, numUnits);
  var playerGraph = new RenderObject();

  playerGraph.player = player;
  playerGraph.graph = graph;

  playerGraph.measure = function (self) {
    self.w = self.graph.w;
    self.h = self.graph.h;
  };

  playerGraph.draw = function (self) {
    self.graph.draw(self);
  };

  return playerGraph;
}

function createPlayerGraphs(p_num_players) {
  const n = p_num_players;
  const playerGraphs = [];

  for (let i = 0; i < n; i += 1) {
    playerGraphs.push(createPlayerGraph(600, 800, 200));
  }

  return playerGraphs;
}

function pointInsideObject(obj, px, py) {
  var x = obj.x;
  var y = obj.y;
  var w = obj.w;
  var h = obj.h;

  return !(px > x + w || px < x || py > y + h || py < y);
}

function hookMousePositions() {
  var mouse_hook = null;
  var oldMouseMove = document.onmousemove;

  function newMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

  if (Utils.isFunction(oldMouseMove)) {
    mouse_hook = function (event) {
      var result;

      result = oldMouseMove(event);

      newMouseMove(event);

      return result;
    };

    Utils.report("Outside mousemove hook was found. Using post-hook");
  } else {
    mouse_hook = newMouseMove;

    Utils.report("No outside mousemove hook exists. Using direct hook");
  }

  document.onmousemove = mouse_hook;
}

function hookMouseClick(ml) {
  var click_hook = null;
  var oldMouseClick = document.onclick;

  function newMouseClick(event) {
    if (pointInsideObject(startButton, mouseX, mouseY)) {
      ml.start();
    } else if (pointInsideObject(stopButton, mouseX, mouseY)) {
      ml.stop();
    } else {
      Utils.report("Random click");
    }
  }

  if (Utils.isFunction(oldMouseClick)) {
    click_hook = function (event) {
      oldMouseClick(event);
      newMouseClick(event);
    };

    Utils.report("Outside click function was found. Using post-hook");
  } else {
    click_hook = newMouseClick;

    Utils.report("No outside click function exists. Using direct hook");
  }

  document.onclick = click_hook;
}

function addNewPlayerData(p_playerGraphs) {
  var player_graph;
  var new_score;

  var i = 0;
  var n = p_playerGraphs.length;

  for (i; i < n; i += 1) {
    player_graph = p_playerGraphs[i];

    new_score = player_graph.player.getScore();

    player_graph.graph.addScore(new_score);
  }
}

function checkForNextRound() {
  var cur_time = Utils.getTime();

  if (old_time + time_per_round < cur_time) {
    round += 1;

    old_time = cur_time;
  }
}

function clear() {
  display.clear();
}

function draw() {
  const n = renderObjects.length;

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

  if (round > old_round) {
    old_round = round;

    addNewPlayerData(playerGraphs);
  }

  clear();
  draw();
}

let mouseX = 0.0;
let mouseY = 0.0;

let renderObjects = [];
let framerate = 60;

let round = 0;
let old_round = 0;
let old_time = Utils.getTime();
let time_per_round = 1; // 1 millisecond

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

const startButton = new RenderableButton(display, "START");
renderObjects.push(startButton);

const stopButton = new RenderableButton(display, "STOP");
renderObjects.push(stopButton);

const playerGraphs = createPlayerGraphs(5);
renderObjects = renderObjects.concat(playerGraphs);

hookMousePositions();
hookMouseClick(mainloop);

debugger;
mainloop.start();
