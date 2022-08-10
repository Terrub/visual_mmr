function createDisplayFromCanvas(canvas) {
  var self;
  var glib;

  self = {};
  glib = canvas.getContext("2d");

  self.drawPixel = function (x, y, color) {
    glib.fillStyle = color;
    glib.fillRect(x, y, 1, 1);
  };

  self.drawRect = function (x, y, w, h, color) {
    glib.fillStyle = color;
    glib.fillRect(x, y, w, h);
  };

  self.strokeRect = function (x, y, w, h, strokeWidth, color) {
    glib.lineWidth = strokeWidth;
    glib.strokeStyle = color;
    glib.strokeRect(x, y, w, h);
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
