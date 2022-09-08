import { Utils } from "../utils.js";

export class Player {
  #rating;

  #deviance;

  #lowerBound;

  #upperBound;

  constructor(pRating, pDeviance) {
    if (Utils.isDefined(pRating)) {
      this.setRating(pRating);
    }
    if (Utils.isDefined(pDeviance)) {
      this.setDeviance(pDeviance);
    }
  }

  setRating(pRating) {
    if (!Utils.isNumber(pRating)) {
      Utils.reportUsageError("setRating requires a number");
    }

    if (pRating > 1 || pRating < 0) {
      Utils.reportUsageError("Rating constrained to values between 0 and 1");
    }

    this.#rating = pRating;
  }

  setDeviance(pDeviance) {
    const half_deviance = this.#deviance * 0.5;
    this.#deviance = pDeviance;

    this.#lowerBound = Utils.constrain(this.#rating - half_deviance, 0, 1);
    this.#upperBound = Utils.constrain(this.#rating + half_deviance, 0, 1);
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
}
