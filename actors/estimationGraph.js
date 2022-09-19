function drawMean(instance) {
  const gl = instance.gLib;
  const halfWidth = instance.w * 0.5;
  const x = instance.x + halfWidth;
  const y = instance.h;
  // Just draw a full height line for now
  // perhaps set height to confidence/certainty later
  const h = -instance.h;
  const colorMean = "#f00";

  gl.drawRect(x, y, 1, h, colorMean);
}

function drawCurve(instance) {
  const gl = instance.gLib;
  const colorCurve = "#aaa";
  // draw 2 cubic beziers?
  // so we have a full length (min, max) for horizontal travel

  // const halfCurveWidth = instance;
  const first = {
    start: { x: instance.x + 0, y: instance.y + 0 },
    cp1: { x: instance.x + 100, y: instance.y + 0 },
    cp2: { x: instance.x + 0, y: instance.y + 100 },
    end: { x: instance.x + 100, y: instance.y + 100 },
  }
  const second = {
    start: { x: instance.x + 100, y: instance.y + 100 },
    cp1: { x: instance.x + 200, y: instance.y + 100 },
    cp2: { x: instance.x + 100, y: instance.y + 0 },
    end: { x: instance.x + 200, y: instance.y + 0 },
  }
  
  //  One s-bend from start to top of curve
  gl.drawCurve(
    first.start.x,
    first.start.y,
    first.cp1.x,
    first.cp1.y,
    first.cp2.x,
    first.cp2.y,
    first.end.x,
    first.end.y,
    colorCurve
  );
  //    One s-bend from top to end of curve
  gl.drawCurve(
    second.start.x,
    second.start.y,
    second.cp1.x,
    second.cp1.y,
    second.cp2.x,
    second.cp2.y,
    second.end.x,
    second.end.y,
    colorCurve
  );
}
export class EstimationGraph {
  gLib;
  x;
  y;
  w;
  h;
  scores = [];

  constructor(gLib, width, height) {
    this.gLib = gLib;
    this.w = width;
    this.h = height;
  }

  addScore(score) {
    this.scores.push(score);
  }

  draw(data) {
    drawMean(this);
    drawCurve(this);
  }
}
