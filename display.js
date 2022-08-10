function createDisplayFromCanvas(canvas) {
  const self = {};
  const glib = canvas.getContext("2d");

  self.drawLine = (x1, y1, x2, y2, color, lineWidth = 1) => {
    glib.lineWidth = lineWidth;
    glib.strokeStyle = color;
    glib.beginPath();
    glib.moveTo(x1, y1);
    glib.lineTo(x2, y2);
    glib.stroke();
  };

  self.drawPixel = function (x, y, color) {
    glib.fillStyle = color;
    glib.fillRect(x, y, 1, 1);
  };

  self.drawRect = function (x, y, w, h, color) {
    glib.fillStyle = color;
    glib.fillRect(x, y, w, h);
  };

  self.strokeRect = function (x, y, w, h, color, strokeWidth = 1) {
    glib.beginPath();
    glib.lineWidth = strokeWidth;
    glib.strokeStyle = color;
    // glib.strokeRect(x, y, w, h);
    glib.rect(x, y, w, h);
    glib.stroke();
  };

  self.clearRect = function (x, y, w, h) {
    glib.clearRect(x, y, w, h);
  };

  self.fill = function (color) {
    glib.fillStyle = color;
    glib.fillRect(0, 0, canvas.width, canvas.height);
  };

  self.clear = function () {
    glib.clearRect(0, 0, canvas.width, canvas.height);
  };

  self.measureTextWidth = function (text, font) {
    var old_font;
    var result;

    if (isString(font) && glib.font !== font) {
      old_font = glib.font;

      glib.font = font;

      result = gl.measureText(text).width;

      glib.font = old_font;
    } else {
      result = gl.measureText(text).width;
    }

    return result;
  };

  self.text = function (x, y, text, color, font) {
    if (isDefined(color)) {
      glib.fillStyle = color;
    }

    if (isDefined(font)) {
      glib.font = font;
    }

    glib.fillText(text, x, y);
  };

  return self;
}
