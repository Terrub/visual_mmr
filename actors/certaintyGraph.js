import { Utils } from "../utils.js";

function drawAxisX(instance) {
  const gl = instance.gLib;
  gl.drawRect(
    instance.x,
    instance.y + instance.h,
    instance.w,
    1,
    instance.colors.axis
  );
}

function drawBackground(instance) {
  const gl = instance.gLib;
  gl.drawRect(
    instance.x,
    instance.y,
    instance.w,
    instance.h,
    instance.colors.background
  );
}

function drawAxisY(instance) {
  const gl = instance.gLib;
  gl.drawRect(
    instance.x + instance.w / 2 - 1,
    instance.y + 0,
    1,
    instance.h,
    instance.colors.axis
  );
}

function calcMeanFromData(data) {
  if (data.length < 1) {
    return 0;
  }

  const n = data.length;
  const sum = data.reduce((prev, curr) => prev + curr);

  return sum / n;
}

function calcGaussianFromData() {
  return [];
}

function calcCertaintyFromData(data) {
  const certainty = 0;

  return certainty;
}

function calcValues(instance) {
  const data = instance.data;
  const w = instance.numUnits;
  let i = 0;
  const n = data.length;
  const values = [];

  // initiate all x locations in the graph with 0;
  for (i = 0; i < w; i += 1) {
    values[i] = 0;
  }

  for (i = 0; i < n; i += 1) {
    const x = Math.floor(data[i] * w);
    values[x] += 1;
  }

  instance.values = values;
}

function drawValues(instance) {
  const gl = instance.gLib;
  const unitWidth = instance.w / instance.numUnits;

  for (let i = 0; i < instance.numUnits; i += 1) {
    let val = Math.floor(
      (instance.values[i] / instance.data.length) * instance.h
    );
    if (val > instance.h) {
      val = instance.h;
    }
    if (val < 0) {
      val = 0;
    }
    gl.drawRect(
      instance.x + i * unitWidth,
      instance.y + instance.h - val,
      unitWidth,
      val,
      instance.colors.values
    );
  }
}

function drawMean(instance, mean, certainty) {
  // Draw the current mean as a vertical line at x(mean) with height(certainty)
  const gl = instance.gLib;
  const x = instance.x + mean;
  const y = instance.y;
  const w = 1;
  const h = certainty;
  const c = instance.colors.mean;

  gl.drawRect(x, y, w, h, c);
}

function drawEstimateCurve(instance) {
  // Draw the gaussian curve corresponding with current certainty (height) and
  // width of the bellcurve based on current deviation.
}

function getBackgroundColor() {
  return "rgba(50,50,50,0.3)";
}

function getAxisColor() {
  return "rgba(80,80,80,0.7)";
}

function getRandomColor() {
  const hue = Utils.generateRandomNumber(0, 360);
  const lum = Utils.generateRandomNumber(40, 70);

  return `hsla(${hue}, 100%, ${lum}%, 0.6)`;
}

function getMeanColor() {
  // The colour for the curve's center line, the mean for the current data by estimate.
  // Red-ish for now.
  return "#c33";
}

function getCurveColor() {
  // The colour for the gaussian/bell curve displaying current distribution estimate
  // Off-white for now.
  return "#ccc";
}

export class CertaintyGraph {
  #gLib;

  #x = 0;

  #y = 0;

  #width;

  #height;

  #numUnits;

  #data;

  #values;

  #colors;

  constructor(gLib, width, height, numUnits) {
    if (Utils.isUndefined(gLib)) {
      Utils.reportUsageError(
        "CertaintyGraph requires a graphics library to function."
      );

      return;
    }

    if (Utils.isDefined(width)) {
      this.#width = width;
    }

    if (Utils.isDefined(height)) {
      this.#height = height;
    }

    if (Utils.isDefined(numUnits)) {
      this.#numUnits = numUnits;
    }

    this.#gLib = gLib;
    this.#data = [];
    this.#values = [];
    this.#colors = {
      values: getRandomColor(),
      axis: getAxisColor(),
      background: getBackgroundColor(),
      mean: getMeanColor(),
      curve: getCurveColor(),
    };
  }

  get gLib() {
    return this.#gLib;
  }

  get x() {
    return this.#x;
  }
  set x(value) {
    if (!Utils.isInteger(value)) {
      Utils.reportUsageError("x should be an integer");
      return;
    }
    this.#x = value;
  }

  get y() {
    return this.#y;
  }
  set y(value) {
    if (!Utils.isInteger(value)) {
      Utils.reportUsageError("y should be an integer");
      return;
    }
    this.#y = value;
  }

  get w() {
    return this.#width;
  }
  set w(value) {
    if (!Utils.isInteger(value)) {
      Utils.reportUsageError("width should be an integer");
      return;
    }
    this.#width = value;
  }

  get h() {
    return this.#height;
  }
  set h(value) {
    if (!Utils.isInteger(value)) {
      Utils.reportUsageError("height should be an integer");
      return;
    }
    this.#height = value;
  }

  get numUnits() {
    return this.#numUnits;
  }
  set numUnits(value) {
    if (!Utils.isInteger(value)) {
      Utils.reportUsageError("numUnits should be an integer");
      return;
    }
    this.#numUnits = value;
  }

  get data() {
    return this.#data;
  }

  get values() {
    return this.#values;
  }
  set values(values) {
    if (!Utils.isArray(values)) {
      Utils.reportUsageError("values should be an array");
      return;
    }
    this.#values = values;
  }

  get colors() {
    return this.#colors;
  }
  set colors(colors) {
    if (!Utils.isObject(colors)) {
      Utils.reportUsageError("colors should be a certaintyGraph color object");
      return;
    }
    this.#colors = colors;
  }

  draw() {
    const mean = calcMeanFromData(this.#data);
    const gaussian = calcGaussianFromData(this.#data);
    const certainty = calcCertaintyFromData(this.#data);

    drawAxisX(this);
    drawAxisY(this);
    calcValues(this);
    drawValues(this);
    drawMean(this, mean, certainty);
    drawEstimateCurve(this, mean, gaussian);
  }

  addScore(pScore) {
    this.#data.push(pScore);
  }
}
