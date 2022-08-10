const WALL = "brown";
const HALL = "black";
const LADDER = "orange";
const END = "cyan";
const BANDIDA = "lightgray";

const width = 3;
const height = 6;
const numCells = width * height;

const markToCellIndexMap = [3, 1, 5, 14, 16, 12];

const createTile = (function defineCreateTile() {
  let internalId = 0;

  function createTile(definition) {
    const tile = {
      id: internalId,
      rotation: 0,
      x: 0,
      y: 0,
      cells: [],
      definition: definition,
    };
    const markers = definition.split("");

    fillTileWithCells(tile);
    createInternalHallways(tile);
    createExitsFromMarkers(tile, markers);
    createDeadEnds(tile, markers);

    internalId += 1;

    return tile;
  }

  return createTile;
})();

// Row 1 - 8
const TILE_101011A = createTile("101011");
const TILE_110110 = createTile("110110");
const TILE_001010A = createTile("001010");
const TILE_000111A = createTile("000111");
const TILE_101110A = createTile("101110");
const TILE_000011A = createTile("000011");
const TILE_LADDER = createLadderTile();
const TILE_110010 = createTile("110010");
// Row 2 - 8
const TILE_010111A = createTile("010111");
const TILE_101101A = createTile("101101");
const TILE_100110A = createTile("100110");
const TILE_001001A = createTile("001001");
const TILE_100110B = createTile("100110");
const TILE_000010 = createTile("000010");
const TILE_001100A = createTile("001100");
const TILE_100100A = createTile("100100");
const TILE_BANDIDA = createBandidaTile();
// Row 3 - 9
const TILE_000110A = createTile("000110");
const TILE_001111A = createTile("001111");
const TILE_010110A = createTile("010110");
const TILE_100111A = createTile("100111");
const TILE_010101A = createTile("010101");
const TILE_001010B = createTile("001010");
const TILE_010011A = createTile("010011");
const TILE_001110A = createTile("001110");
const TILE_000101A = createTile("000101");
// Row 4 - 9
const TILE_010010A = createTile("010010");
const TILE_010010B = createTile("010010");
const TILE_000011B = createTile("000011");
const TILE_010011B = createTile("010011");
const TILE_101101X = createTile("101101");
const TILE_100010A = createTile("100010");
const TILE_001101A = createTile("001101");
const TILE_000001A = createTile("000001");
const TILE_001100X = createTile("001100");
// Row 5 - 9
const TILE_001011A = createTile("001011");
const TILE_001110B = createTile("001110");
const TILE_010110B = createTile("010110");
const TILE_100010B = createTile("100010");
const TILE_100111B = createTile("100111");
const TILE_010101B = createTile("010101");
const TILE_000100A = createTile("000100");
const TILE_010101C = createTile("010101");
const TILE_001101B = createTile("001101");
// Row 6 - 9
const TILE_101110B = createTile("101110");
const TILE_010111B = createTile("010111");
const TILE_011110A = createTile("011110");
const TILE_011011 = createTile("011011");
const TILE_010011C = createTile("010011");
const TILE_100101A = createTile("100101");
const TILE_010011D = createTile("010011");
const TILE_000110B = createTile("000110");
const TILE_011110B = createTile("011110");
// Row 7 - 9
const TILE_001001B = createTile("001001");
const TILE_000001B = createTile("000001");
const TILE_001010C = createTile("001010");
const TILE_001111B = createTile("001111");
const TILE_010110C = createTile("010110");
const TILE_000101B = createTile("000101");
const TILE_000100B = createTile("000100");
const TILE_000011C = createTile("000011");
const TILE_000110C = createTile("000110");
// Row 8 - 9
const TILE_101011B = createTile("101011");
const TILE_010111C = createTile("010111");
const TILE_100011A = createTile("100011");
const TILE_100011B = createTile("100011");
const TILE_100101B = createTile("100101");
const TILE_100010C = createTile("100010");
const TILE_001011B = createTile("001011");
const TILE_000111B = createTile("000111");
const TILE_100100B = createTile("100100");

const AVAILABLE_TILES = [
  TILE_101011A,
  TILE_110110,
  TILE_001010A,
  TILE_000111A,
  TILE_101110A,
  TILE_000011A,
  TILE_LADDER,
  TILE_110010,
  TILE_010111A,
  TILE_101101A,
  TILE_100110A,
  TILE_001001A,
  TILE_100110B,
  TILE_000010,
  TILE_001100A,
  TILE_100100A,
  TILE_BANDIDA,
  TILE_000110A,
  TILE_001111A,
  TILE_010110A,
  TILE_100111A,
  TILE_010101A,
  TILE_001010B,
  TILE_010011A,
  TILE_001110A,
  TILE_000101A,
  TILE_010010A,
  TILE_010010B,
  TILE_000011B,
  TILE_010011B,
  TILE_101101X,
  TILE_100010A,
  TILE_001101A,
  TILE_000001A,
  TILE_001100X,
  TILE_001011A,
  TILE_001110B,
  TILE_010110B,
  TILE_100010B,
  TILE_100111B,
  TILE_010101B,
  TILE_000100A,
  TILE_010101C,
  TILE_001101B,
  TILE_101110B,
  TILE_010111B,
  TILE_011110A,
  TILE_011011,
  TILE_010011C,
  TILE_100101A,
  TILE_010011D,
  TILE_000110B,
  TILE_011110B,
  TILE_001001B,
  TILE_000001B,
  TILE_001010C,
  TILE_001111B,
  TILE_010110C,
  TILE_000101B,
  TILE_000100B,
  TILE_000011C,
  TILE_000110C,
  TILE_101011B,
  TILE_010111C,
  TILE_100011A,
  TILE_100011B,
  TILE_100101B,
  TILE_100010C,
  TILE_001011B,
  TILE_000111B,
  TILE_100100B,
];

function fillTileWithCells(tile) {
  let cellIndex = 0;
  for (cellIndex; cellIndex < numCells; cellIndex += 1) {
    tile.cells.push({
      x: cellIndex % width,
      y: Math.floor(cellIndex / width),
      type: WALL,
    });
  }
}

function createInternalHallways(tile) {
  /*
    create Internal hallway

    # # #       # # #
    # # #       # . #
    # # #   =>  # . #
    # # #       # . #
    # # #       # . #
    # # #       # # #
  */
  for (const cellIndex of [4, 7, 10, 13]) {
    tile.cells[cellIndex].type = HALL;
  }
}

function createExitsFromMarkers(tile, markers) {
  for (const markIndex in markers) {
    const cellType = +markers[markIndex];

    // Markers with a 1 are halls
    if (cellType === 1) {
      const cellIndex = markToCellIndexMap[markIndex];
      tile.cells[cellIndex].type = HALL;
    }
  }
}

function createDeadEnds(tile, markers) {
  /*
    Do some logic to find Dead Ends.

    Simply said, if we see no hallways at either end of the tile it's a dead end.
    markerIndices look like:
    
      # 1 #   
      0 ? 2   So if the combination 0,1,2 or 3,4,5 have no hallway markers, that end is dead.
      # . #
      # . #
      5 ? 3
      # 4 #
  */

  if (+(markers[0] + markers[1] + markers[2]) === 0) {
    // No hallways in top half, turn it into an END
    tile.cells[4].type = END;
  }

  if (+(markers[3] + markers[4] + markers[5]) === 0) {
    // No hallways in bottom half, turn it into an END
    tile.cells[13].type = END;
  }
}

function createBandidaTile() {
  const bandidaTile = createTile("101111");
  for (const cellIndex of [4, 7, 10, 13]) {
    bandidaTile.cells[cellIndex].type = BANDIDA;
  }
  return bandidaTile;
}

function createLadderTile() {
  const ladderTile = createTile("000010");
  ladderTile.cells[4].type = LADDER;

  return ladderTile;
}
