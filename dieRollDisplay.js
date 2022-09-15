import { Utils } from "../utils.js";

export class DieRollDisplay {
  display;
  x;
  y;
  w;
  h;
  color;

  constructor(display, x, y, w, h, color) {
    this.display = display;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  getMaxVal(data) {
    let maxVal = 0;
    for (let i = 0; i < data.length; i += 1) {
      const val = data[i];
      if (Utils.isDefined(val) && val > maxVal) {
        maxVal = val;
      }
    }

    return maxVal;
  }

  show(data) {
    const gl = this.display;
    // for (let i = 0; i < data.length; i += 1) {
    //   gl.drawRect(this.x + i * 11, this.y, 10, -data[i], this.color);
    // }

    const unit_width = this.w / (data.length + 1) - 1;
    const maxVal = this.getMaxVal(data);

    for (let i = 0; i < data.length; i += 1) {
      let val = Math.floor(
        (data[i] / maxVal) * this.h
      );
      if (val > this.h) {
        val = this.h;
      }
      if (val < 0) {
        val = 0;
      }

      gl.drawRect(
        this.x + i * (unit_width + 1),
        this.y,
        unit_width,
        -val,
        this.color
      );
    }
  }
}
