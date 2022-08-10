function tileMatchesForRotation(head, tail, definition, rotation) {
  const matchIndices = getMatchIndicesForRotation(rotation);
  // check head bit first
  for (const indices of matchIndices.head) {
    const headVal = head[indices[0]];
    const marker = definition[indices[1]];
    if (headVal !== "a" && headVal !== marker) {
      return false;
    }
  }

  if (
    tail[matchIndices.tail[0][0]] !== "a" &&
    tail[matchIndices.tail[0][0]] !== definition[matchIndices.tail[0][1]]
  ) {
    return false;
  }
  if (
    tail[matchIndices.tail[1][0]] !== "a" &&
    tail[matchIndices.tail[1][0]] !== definition[matchIndices.tail[1][1]]
  ) {
    return false;
  }
  if (
    tail[matchIndices.tail[2][0]] !== "a" &&
    tail[matchIndices.tail[2][0]] !== definition[matchIndices.tail[2][1]]
  ) {
    return false;
  }

  return true;
}

// ------------------

function getMatchIndicesForRotation(rotation) {
  const matchIndices = [
    {
      // rotation 0
      head: [
        [1, 3],
        [2, 4],
        [3, 5],
      ],
      tail: [
        [0, 1],
        [1, 2],
        [3, 0],
      ],
    },
    {
      // rotation 1
      head: [
        [2, 3],
        [3, 4],
        [0, 5],
      ],
      tail: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      // rotation 2
      head: [
        [1, 0],
        [2, 1],
        [3, 2],
      ],
      tail: [
        [0, 4],
        [1, 5],
        [3, 3],
      ],
    },
    {
      // rotation 3
      head: [
        [2, 0],
        [3, 1],
        [0, 2],
      ],
      tail: [
        [0, 3],
        [1, 4],
        [2, 5],
      ],
    },
  ];

  return matchIndices[rotation];
}

function tileMatchesForRotation(head, tail, definition, rotation) {
  const matchIndices = getMatchIndicesForRotation(rotation);

  for (const indices of matchIndices.head) {
    const headVal = head[indices[0]];
    const marker = definition[indices[1]];
    if (headVal !== "a" && headVal !== marker) {
      return false;
    }
  }

  for (const indices of matchIndices.tail) {
    const tailVal = tail[indices[0]];
    const marker = definition[indices[1]];
    if (tailVal !== "a" && tailVal !== marker) {
      return false;
    }
  }

  return true;
}

// ------------------

function updateSpotsForRotation0(tile) {
  let spotValue1 = 0;
  let spotValue2 = 0;

  if (tile.definition[0] === "1") {
    spotValue1 += WEST;
  }
  if (tile.definition[1] === "1") {
    spotValue1 += NORTH;
  }
  if (tile.definition[2] === "1") {
    spotValue1 += EAST;
  }
  if (tile.definition[3] === "1") {
    spotValue2 += EAST;
  }
  if (tile.definition[4] === "1") {
    spotValue2 += SOUTH;
  }
  if (tile.definition[5] === "1") {
    spotValue2 += WEST;
  }

  spots[tile.y][tile.x] = {
    tile: tile,
    value: spotValue1,
  };
  spots[tile.y + 1][tile.x] = {
    tile: tile,
    value: spotValue2,
  };
}

function updateSpotsForRotation1(tile) {
  let spotValue1 = 0;
  let spotValue2 = 0;

  if (tile.definition[0] === "1") {
    spotValue2 += NORTH;
  }
  if (tile.definition[1] === "1") {
    spotValue2 += EAST;
  }
  if (tile.definition[2] === "1") {
    spotValue2 += SOUTH;
  }
  if (tile.definition[3] === "1") {
    spotValue1 += SOUTH;
  }
  if (tile.definition[4] === "1") {
    spotValue1 += WEST;
  }
  if (tile.definition[5] === "1") {
    spotValue1 += NORTH;
  }

  spots[tile.y][tile.x] = {
    tile: tile,
    value: spotValue1,
  };
  spots[tile.y][tile.x + 1] = {
    tile: tile,
    value: spotValue2,
  };
}

function updateSpotsForRotation2(tile) {
  let spotValue1 = 0;
  let spotValue2 = 0;

  if (tile.definition[0] === "1") {
    spotValue2 += EAST;
  }
  if (tile.definition[1] === "1") {
    spotValue2 += SOUTH;
  }
  if (tile.definition[2] === "1") {
    spotValue2 += WEST;
  }
  if (tile.definition[3] === "1") {
    spotValue1 += WEST;
  }
  if (tile.definition[4] === "1") {
    spotValue1 += NORTH;
  }
  if (tile.definition[5] === "1") {
    spotValue1 += EAST;
  }

  spots[tile.y][tile.x] = {
    tile: tile,
    value: spotValue1,
  };
  spots[tile.y + 1][tile.x] = {
    tile: tile,
    value: spotValue2,
  };
}

function updateSpotsForRotation3(tile) {
  let spotValue1 = 0;
  let spotValue2 = 0;

  if (tile.definition[0] === "1") {
    spotValue1 += SOUTH;
  }
  if (tile.definition[1] === "1") {
    spotValue1 += WEST;
  }
  if (tile.definition[2] === "1") {
    spotValue1 += NORTH;
  }
  if (tile.definition[3] === "1") {
    spotValue2 += NORTH;
  }
  if (tile.definition[4] === "1") {
    spotValue2 += EAST;
  }
  if (tile.definition[5] === "1") {
    spotValue2 += SOUTH;
  }

  spots[tile.y][tile.x] = {
    tile: tile,
    value: spotValue1,
  };
  spots[tile.y][tile.x + 1] = {
    tile: tile,
    value: spotValue2,
  };
}

function foo(x, y, rotation) {
  const maxWidth = 20;
  const headIndex = y * maxWidth + x;
  const tailX = x + (rotation % 2);
  const tailY = y + 1 - (rotation % 2);
  const tailIndex = tailY * maxWidth + tailX;

  console.log("Head: (", x, ",", y, ") - ", headIndex);
  console.log("Tail: (", tailX, ",", tailY, ") - ", tailIndex);
}

for (const rotation of [0, 1, 2, 3]) {
  foo(10, 10, rotation);
}

for (const index of [0, 1, 2]) {
  const localScale = 15;
  console.log(index * 3 * (localScale + 1) + 10);
}

// -------------------------------------------------

if (iDidThingsByNotThinkingItOutProperly()) {
  // In case no more cards are left, the game would be over, this setup does not resolve.
  // So pick up the current card again...
  grid.removeTileAt(position.x, position.y, position.rotation);
  // ...and try the next position instead
  position = availablePositions.pop();
  if (isDefined(position)) {
    triedPositionIndex = getTriedPositionId(tile, position);
    if (isUndefined(triedPositions[triedPositionIndex])) {
      triedPositions[triedPositionIndex] = true;
      grid.placeTileAt(tile, position.x, position.y, position.rotation);
    }
  } else {
    while (isUndefined(position)) {
      // If no more available positions for this tile exist.
      // Stash the current tile back on the drawpile...
      drawPile.push(tile);
      // ...and go back to a previous state
      const prevState = prevStates.pop();
      if (isUndefined(prevState)) {
        return -1;
      }
      tile = prevState[0];
      grid.removeTileAt(tile.x, tile.y, tile.rotation);
      availablePositions = prevState[1];
      // Now try this state's next possible position
      position = availablePositions.pop();
      if (
        isDefined(position) &&
        isDefined(triedPositions[getTriedPositionId(tile, position)])
      ) {
        // skip this position, we've already tried it.
        position = undefined;
      }
    }

    triedPositions[getTriedPositionId(tile, position)] = true;
    grid.placeTileAt(tile, position.x, position.y, position.rotation);
  }
}
