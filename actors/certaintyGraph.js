import { Utils } from "../utils.js";

function drawAxisX(instance) {
  const gl = instance.gLib;
  gl.drawRect(
    instance.x + 0,
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
  let sum = 0;

  const n = data.length;

  for (let i = 0; i < n; i += 1) {
    const entry = data[i];
    sum += entry;
  }

  return sum / n;
}

function calcValues(instance) {
  const data = instance.data;
  // const mean = calcMeanFromData(data);
  const w = instance.num_units;
  let i = 0;
  const n = data.length;
  const values = instance.values;

  // initiate all x locations in the graph with 0;
  for (i = 0; i < w; i += 1) {
    values[i] = 0;
  }

  for (i = 0; i < n; i += 1) {
    const x = Math.floor(data[i] * w);
    values[x] += 1;
  }
}

function drawCurve(instance) {
  const gl = instance.gLib;
  const unit_width = instance.w / instance.numUnits;

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
      instance.x + i * unit_width,
      instance.y + instance.h - val,
      unit_width,
      val,
      instance.colors.curve
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
  const lum = Utils.generateRandomNumber(40, 70);

  return `hsla(${hue}%, 100%, ${lum}%, 0.8)`;
}

export class CertaintyGraph {
  #gLib;

  #x;

  #y;

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
      curve: getRandomColor(),
      axis: getAxisColor(),
      background: getBackgroundColor(),
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
    drawAxisX(this);
    drawAxisY(this);
    calcValues(this);
    drawCurve(this);
  }

  addScore(pScore) {
    this.#data.push(pScore);
  }
}
