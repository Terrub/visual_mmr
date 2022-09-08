export class RenderObject {
  #x;

  #y;

  #w;

  #h;

  #propertiesHaveChanged = false;

  #dimensionsHaveChanged = false;

  constructor() {}    

  getX() {
    return this.#x;
  }

  setX(pX) {
    this.#x = pX;

    this.#dimensionsHaveChanged = true;
  }
  
  getY() {
    return this.#y;
  }

  setY(pY) {
    this.#y = pY;

    this.#dimensionsHaveChanged = true;
  }
  
  getw() {
    return this.#w;
  }

  setw(pW) {
    this.#w = pW;

    this.#dimensionsHaveChanged = true;
  }
  
  geth() {
    return this.#h;
  }

  seth(pH) {
    this.#h = pH;

    this.#dimensionsHaveChanged = true;
  }
  
  proto_update() {}

  proto_measure() {}

  proto_draw() {}
}
