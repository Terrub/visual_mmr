export class RenderObject {
  #x;

  #y;

  #w;

  #h;

  #propertiesHaveChanged = true;

  #dimensionsHaveChanged = true;

  constructor() {}    

  get x() {
    return this.#x;
  }

  set x(pX) {
    this.#x = pX;

    this.#dimensionsHaveChanged = true;
  }
  
  get y() {
    return this.#y;
  }

  set y(pY) {
    this.#y = pY;

    this.#dimensionsHaveChanged = true;
  }
  
  get w() {
    return this.#w;
  }

  set w(pW) {
    this.#w = pW;

    this.#dimensionsHaveChanged = true;
  }
  
  get h() {
    return this.#h;
  }

  set h(pH) {
    this.#h = pH;

    this.#dimensionsHaveChanged = true;
  }

  get dimensionsHaveChanged() {
    return this.#dimensionsHaveChanged
  }

  get propertiesHaveChanged() {
    return this.#propertiesHaveChanged
  }
  
  update() {
    this.#propertiesHaveChanged = false;
  }

  measure() {
    this.#dimensionsHaveChanged = false;
  }

  draw() {}
}
