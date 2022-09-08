import { Utils } from "../utils.js";

export class Display {
  width;

  height;

  gLib;

  constructor(gLib, width, height) {
    this.width = width;
    this.height = height;
    this.gLib = gLib;
  }

  drawPixel(x, y, color) {
    this.gLib.fillStyle = color;
    this.gLib.fillRect(x, y, 1, 1);
  }

  drawLine(x1, y1, x2, y2, color, lineWidth = 1) {
    this.gLib.lineWidth = lineWidth;
    this.gLib.strokeStyle = color;
    this.gLib.beginPath();
    this.gLib.moveTo(x1, y1);
    this.gLib.lineTo(x2, y2);
    this.gLib.stroke();
  }

  drawRect(x, y, x2, y2, color) {
    this.gLib.fillStyle = color;
    this.gLib.fillRect(x, y, x2, y2);
  }

  strokeRect(x, y, w, h, color, strokeWidth = 1) {
    this.gLib.beginPath();
    this.gLib.lineWidth = strokeWidth;
    this.gLib.strokeStyle = color;
    this.gLib.strokeRect(x, y, w, h);
    // this.gLib.rect(x, y, w, h);
    // this.gLib.stroke();
  }

  fill(color) {
    this.gLib.fillStyle = color;
    this.gLib.fillRect(0, 0, this.width, this.height);
  }

  clear() {
    this.gLib.clearRect(0, 0, this.width, this.height);
  }
 
  clearRect(x, y, w, h) {
    this.gLib.clearRect(x, y, w, h);
  }

  measureTextWidth(text, font) {
    let oldFont;
    let result;

    if (Utils.isString(font) && this.gLib.font !== font) {
      oldFont = gLib.font;

      this.gLib.font = font;

      result = this.gLib.measureText(text).width;

      this.gLib.font = oldFont;
    } else {
      result = this.gLib.measureText(text).width;
    }

    return result;
  }

  text = function (x, y, text, color, font) {
    if (Utils.isDefined(color)) {
      this.gLib.fillStyle = color;
    }

    if (Utils.isDefined(font)) {
      this.gLib.font = font;
    }

    this.gLib.fillText(text, x, y);
  }
}
