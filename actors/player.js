import { Utils } from "../utils.js";

export class Player {
  #rating;
  #deviance;
  #lowerBound;
  #upperBound;
  #name;
  #gLib;

  constructor(pGLib, pName, pRating, pDeviance) {
    this.#gLib = pGLib;

    if (Utils.isString(pName)) {
      this.#name = pName;
    }

    if (Utils.isDefined(pRating)) {
      this.setRating(pRating);
    }
    if (Utils.isDefined(pDeviance)) {
      this.setDeviance(pDeviance);
    }
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (!Utils.isString(value)) {
      Utils.reportUsageError("name should be a string");

      return;
    }
    this.#name = value;
  }

  setRating(pRating) {
    if (!Utils.isNumber(pRating)) {
      Utils.reportUsageError("setRating requires a number");

      return;
    }

    if (pRating > 1 || pRating < 0) {
      Utils.reportUsageError("Rating constrained to values between 0 and 1");

      return;
    }

    this.#rating = pRating;
  }

  setDeviance(pDeviance) {
    this.#deviance = pDeviance;
    const halfDeviance = this.#deviance * 0.5;

    this.#lowerBound = Utils.constrain(this.#rating - halfDeviance, 0, 1);
    this.#upperBound = Utils.constrain(this.#rating + halfDeviance, 0, 1);
  }

  getScore() {
    const n = 6;
    let result = 0;

    for (let i = 0; i < n; i += 1) {
      result +=
        Math.random() * (this.#upperBound - this.#lowerBound) +
        this.#lowerBound;
    }

    result /= n;

    return result;
  }

  draw(color, x, y) {
    const gl = this.#gLib;
    gl.drawRect(x, y, 12, 12, color);
    gl.text(x + 15, y + 12, this.#name, "#aaa", "20px Arial");
  }
}
