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

  set x(value) {
    this.#x = value;

    this.#dimensionsHaveChanged = true;
  }

  get y() {
    return this.#y;
  }

  set y(value) {
    this.#y = value;

    this.#dimensionsHaveChanged = true;
  }

  get w() {
    return this.#w;
  }

  set w(value) {
    this.#w = value;

    this.#dimensionsHaveChanged = true;
  }

  get h() {
    return this.#h;
  }

  set h(value) {
    this.#h = value;

    this.#dimensionsHaveChanged = true;
  }

  get dimensionsHaveChanged() {
    return this.#dimensionsHaveChanged;
  }

  get propertiesHaveChanged() {
    return this.#propertiesHaveChanged;
  }

  update() {
    this.#propertiesHaveChanged = false;
  }

  measure() {
    this.#dimensionsHaveChanged = false;
  }

  draw() {}
}
