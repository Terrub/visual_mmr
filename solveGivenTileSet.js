function createGivenTileSetSolver(drawPile, grid) {
  const proto = {};
  const triedPositions = {};
  const placedTiles = [];

  let availablePositions;
  let position;
  let tile;

  function drawTiles(hand, n = 3) {
    while (hand.length < n) {
      const tile = tileSet.pop();

      hand.push(tile);
    }
  }

  function getTriedPositionId(tile, position) {
    return (
      tile.id +
      "," +
      position.x +
      "," +
      position.y +
      "," +
      position.rotation +
      "," +
      position.totalMatchStr
    );
  }

  function addTriedPosition(tile, position) {
    triedPositions[getTriedPositionId(tile, position)] = true;
  }

  function isUntriedPosition(tile, position) {
    const triedPositionId = getTriedPositionId(tile, position);
    return triedPositions[triedPositionId] !== true;
  }

  // function addTriedPosition(tile, position) {
  //   if (isUndefined(triedPositions[tile.id])) {
  //     triedPositions[tile.id] = {};
  //   }
  //   triedPositions[tile.id][getTriedPositionId(tile, position)] = true;
  // }

  // function isUntriedPosition(tile, position) {
  //   if (isUndefined(triedPositions[tile.id])) {
  //     return true;
  //   }
  //   const triedPositionId = getTriedPositionId(tile, position);
  //   return triedPositions[tile.id][triedPositionId] !== true;
  // }

  function getNextAvailablePosition(tile, availPos) {
    let nextAvailablePosition;

    while (isUndefined(nextAvailablePosition) && availPos.length > 0) {
      const position = availPos.pop();
      if (isDefined(position) && isUntriedPosition(tile, position)) {
        nextAvailablePosition = position;
      }
    }

    return nextAvailablePosition;
  }

  function iDidThingsByNotThinkingItOutProperly() {
    alert("YOU DUMBASS!!!");
  }

  proto.drawTiles = (hand) => {
    drawTiles(hand, 1);
  };

  // Ok so this is a game tic run every drawcycle.
  // what do we actually want to see?
  // - Current card(s) in hand
  // - Current board
  // - Current drawpile

  // So what do we do that changes any of this?
  // Scenarios:
  // 1 We have a tile in hand and a suitable location to put it
  //   * Remove tile from hand
  //   * Place tile on board at location

  // 2 We have a tile in hand but no more available positions, that we haven't already tried
  //   * We put the hand tile back on the drawpile
  //   * We remove the previous placed tile from the board and into our hand.

  // 3 We have a tile in hand but drawpile is empty, this would be game over.
  //   ! This implies we are aware of how many cards are left in the drawpile
  //   * We put the current hand card back on the drawpile
  //   * Remove the last placed tile from the board into our hand
  proto.placeTile = (boardValue, hand) => {
    if (boardValue === 0) {
      // We've achieved the intended goal. We're done.
      return 0;
    }

    if (!(hand.length > 0)) {
      // Something went wrong or this is game over?
      return -1;
    }

    // we should have a tile in hand so try to place the tile
    tile = hand.pop();
    // get available positions
    availablePositions = grid.getAvailablePositions(tile);
    // grab the first available position
    position = getNextAvailablePosition(tile, availablePositions);

    if (drawPile.length > 0 && isDefined(position)) {
      // SCENARIO 1
      addTriedPosition(tile, position);
      placedTiles.push(tile);
      grid.placeTileAt(tile, position.x, position.y, position.rotation);
    } else {
      // SCENARIO 2 & 3
      drawPile.push(tile);
      if (placedTiles.length < 1) {
        return -1;
      }
      const lastTile = placedTiles.pop();
      grid.removeTileAt(lastTile.x, lastTile.y, lastTile.rotation);
      hand.push(lastTile);
    }

    return 1;
  };

  return proto;
}
