export class PlayerGraph {
  #player;

  #graph;

  constructor(player, graph) {
    this.#player = player;
    this.#graph = graph;
  }

  get graph() {
    return this.#graph;
  }

  get player() {
    return this.#player;
  }
  
  draw(i) {
    const graph = this.graph;
    const player = this.player;

    graph.draw();

    const color = graph.colors.curve;
    const x = 1210;
    const y = 10 + i * 20;

    player.draw(color, x, y);
  }
}
