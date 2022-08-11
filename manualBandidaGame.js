function createManualBandidaGame(drawPile, grid) {
  const proto = {};
  const placedTiles = [];

  let currHand;

  document.addEventListener("keypress", (keyboardEvent) => {
    // console.log(keyboardEvent);
    const eventHandlers = {
      q: () => {
        const tileInHand = currHand.pop();
        const cT = placedTiles.pop();
        grid.removeTileAt(cT.x, cT.y, cT.rotation);
        drawPile.push(tileInHand);
        currHand.push(cT);
      },
      e: () => {
        const placingTile = currHand[currHand.length - 1];
        const isPlaced = grid.placeTileAt(placingTile, 0, 0, 0);
        if (isPlaced) {
          placedTiles.push(currHand.pop());
        }
      },
      r: () => {
        const cT = placedTiles[placedTiles.length - 1];
        grid.removeTileAt(cT.x, cT.y, cT.rotation);
        const newRotation = (4 + cT.rotation - 1) % 4;
        const isPlaced = grid.placeTileAt(cT, cT.x, cT.y, newRotation);
        if (isPlaced) {
          grid.placeTileAt(cT, cT.x, cT.y, cT.rotation);
        }
      },
      f: () => {
        const cT = placedTiles[placedTiles.length - 1];
        grid.removeTileAt(cT.x, cT.y, cT.rotation);
        const newRotation = (cT.rotation + 1) % 4;
        const isPlaced = grid.placeTileAt(cT, cT.x, cT.y, newRotation);
        if (isPlaced) {
          grid.placeTileAt(cT, cT.x, cT.y, cT.rotation);
        }
      },
      w: () => {
        const cT = placedTiles[placedTiles.length - 1];
        grid.removeTileAt(cT.x, cT.y, cT.rotation);
        const isPlaced = grid.placeTileAt(cT, cT.x, cT.y - 1, cT.rotation);
        if (!isPlaced) {
          grid.placeTileAt(cT, cT.x, cT.y, cT.rotation);
        }
      },
      a: () => {
        const cT = placedTiles[placedTiles.length - 1];
        grid.removeTileAt(cT.x, cT.y, cT.rotation);
        const isPlaced = grid.placeTileAt(cT, cT.x - 1, cT.y, cT.rotation);
        if (!isPlaced) {
          grid.placeTileAt(cT, cT.x, cT.y, cT.rotation);
        }
      },
      s: () => {
        const cT = placedTiles[placedTiles.length - 1];
        grid.removeTileAt(cT.x, cT.y, cT.rotation);
        const isPlaced = grid.placeTileAt(cT, cT.x, cT.y + 1, cT.rotation);
        if (!isPlaced) {
          grid.placeTileAt(cT, cT.x, cT.y, cT.rotation);
        }
      },
      d: () => {
        const cT = placedTiles[placedTiles.length - 1];
        grid.removeTileAt(cT.x, cT.y, cT.rotation);
        const isPlaced = grid.placeTileAt(cT, cT.x + 1, cT.y, cT.rotation);
        if (!isPlaced) {
          grid.placeTileAt(cT, cT.x, cT.y, cT.rotation);
        }
      },
    };

    if ("qwerasdf".includes(keyboardEvent.key)) {
      eventHandlers[keyboardEvent.key]();
    }

    loop.next();
  });

  // Order drawPile for comedic effect;
  drawPile.sort((a, b) => {
    // NUM EXITS - Order by number of exits per tile. Lowest exits at bottom of pile
    // return getNumberOfExitsForTile(a) - getNumberOfExitsForTile(b);

    // RANDOM - Order randomly
    // return 1 - Math.round(Math.random()) * 2;

    // GIVEN ORDER - Keep order as defined in bandidaTiles.js
    return 0;
  });

  function getNumberOfExitsForTile(tile) {
    return tile.definition.split("1").length - 1;
  }

  function drawTiles(hand, n = 3) {
    while (hand.length < n) {
      const tile = tileSet.pop();

      hand.push(tile);
    }
  }

  proto.drawTiles = (hand) => {
    drawTiles(hand, 1);
  };

  // Ok so this is a game tic run every drawcycle.
  /*
    Lets allow some manual placement.
    The game tic runs the whole time so all we need to do here is bind some keystrokes to manage
    the tiles in some way.
    Lets just say that every new time is placed in the top left (position: (0,0))
    Then bind some keys:
      - A for move tile Left
      - W for move tile up
      - D for move tile right
      - S for move tile down
      - E for place tile
        (i.e. empty hand onto board for us to move, causing a new tile draw)
      - Q for put tile back on drawPile
        (i.e. putting current tile back in hand and hand tile on drawpile)
      - R for rotate tile I guess
  */
  proto.placeTile = (boardValue, hand) => {
    if (boardValue === 0) {
      // We've achieved the intended goal. We're done.
      return 0;
    }

    currHand = hand;

    // // we should have a tile in hand so try to place the tile
    // tile = hand.pop();
    // // get available positions
    // availablePositions = grid.getAvailablePositions(tile);
    // // grab the first available position
    // position = getNextAvailablePosition(tile, availablePositions);

    // if (drawPile.length > 0 && isDefined(position)) {
    //   // SCENARIO 1
    //   addTriedPosition(tile, position);
    //   placedTiles.push(tile);
    //   grid.placeTileAt(tile, position.x, position.y, position.rotation);
    // } else {
    //   // SCENARIO 2 & 3
    //   drawPile.push(tile);
    //   if (placedTiles.length < 1) {
    //     return -1;
    //   }
    //   const lastTile = placedTiles.pop();
    //   grid.removeTileAt(lastTile.x, lastTile.y, lastTile.rotation);
    //   hand.push(lastTile);
    // }

    return 1;
  };

  return proto;
}
