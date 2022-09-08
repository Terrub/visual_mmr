import { Utils } from "../utils.js";

function drawAxisX(instance) {
  var width = instance.w;
  var height = instance.h;
  var x = instance.x;
  var y = instance.y;
  var color = instance.colors.axis;

  gl.drawRect(
      x + 0, y + height,
      width, 1,
      color
  );
}

function drawBackground(instance) {
  var width = instance.w;
  var height = instance.h;
  var x = instance.x;
  var y = instance.y;
  var color = instance.colors.background;

  gl.drawRect(
      x, y,
      width, height,
      color
  );
}

function drawAxisY(instance) {
  var width = instance.w;
  var height = instance.h;
  var x = instance.x;
  var y = instance.y;
  var color = instance.colors.axis;

  var half_width = (width / 2);

  gl.drawRect(
      x + half_width - 1, y + 0,
      1, height,
      color
  );
}

function calcMeanFromData(data) {
  var entry;
  var sum = 0;

  var i = 0;
  var n = data.length;

  for ( i; i < n; i += 1 ) {
    entry = data[i];
    sum += entry;
  }

  return sum / n;
}

function calcValues(instance) {
  var flr = Math.floor;
  var data = instance.data;
  // var mean = calcMeanFromData(data);
  var x;
  var w = instance.num_units;
  var i = 0;
  var n = data.length;
  var values = instance.values;

  // initiate all x locations in the graph with 0;
  for (i = 0; i < w; i += 1) {
    values[i] = 0;
  }

  for (i = 0; i < n; i += 1) {
    x = flr(data[i] * w);
    values[x] += 1;
  }
}

function drawCurve(instance) {
  var flr = Math.floor;

  var width = instance.w;
  var height = instance.h;
  var x = instance.x;
  var y = instance.y;

  var color = instance.colors.curve;
  var values = instance.values;
  var n = instance.data.length;

  var i = 0;

  var num_units = instance.num_units;
  var unit_width = width / num_units;
  var val;

  for (i; i < num_units; i += 1) {
    val = flr(values[i] / n * height);
    if (val > height) { val = height; }
    if (val < 0) { val = 0; }
    gl.drawRect(
      x + (i * unit_width), y + height - val,
      unit_width, val,
      color
    );
  }
}

function getBackgroundColor() {
    return "rgba(50,50,50,0.3)";
}

function getAxisColor() {
    return "rgba(80,80,80,0.7)";
}

function getRandomColor() {
    const hue = Utils.generateRandomNumber(0, 360);
    const lum = Utils.generateRandomNumber(40,70);

    return `hsla(${hue}%, 100%, ${lum}%, 0.8)`;
}

export class CertaintyGraph {
  #gLib;

  #width;

  #height;

  #numUnits;

  #data;

  #values;

  #colors;
    
  constructor(gLib, width, height, numUnits) {
    if (Utils.isUndefined(gLib)) {
      Utils.reportUsageError("CertaintyGraph requires a graphics library to function.");

      return;
    }

    if (Utils.isDefined(width)) {
      this.#width = width;
    }
    
    if (Utils.isDefined(height)) {
      this.#height = height;
    }
    
    if (Utils.isDefined(numUnits)) {
      this.setNumUnits(numUnits);
    }

    this.#gLib = gLib;
    this.#data = [];
    this.#values = [];
    this.#colors = {
        curve: getRandomColor(),
        axis: getAxisColor(),
        background: getBackgroundColor()
    };
  }

  draw() {
    drawAxisX(this);
    drawAxisY(this);
    calcValues(this);
    drawCurve(this);
  }

  setNumUnits(pNumUnits) {
    this.#numUnits = pNumUnits;
  }

  addScore(pScore) {
    this.#data.push(pScore);
  }
}
