// TILE SETTINGS
const tileSize = 64;

// MAP DATA
const MAP_COLS = 100;
const MAP_ROWS = 100;

// TILE TYPES (for clarity)
const TILE_GRASS = 0;
const TILE_WALL = 1;
const TILE_RESOURCE = 2;

// MAP LAYERS
const groundLayer = [];
const objectLayer = [];

// GENERATE MAP
for (let row = 0; row < MAP_ROWS; row++) {
  const groundRow = [];
  const objectRow = [];

  for (let col = 0; col < MAP_COLS; col++) {
    // 🌿 DEFAULT GROUND
    let groundTile = TILE_GRASS;

    // 🌍 SIMPLE BIOMES (vertical slices)
    if (row < 30) {
      groundTile = TILE_GRASS; // forest zone (later: darker grass)
    } else if (row < 60) {
      groundTile = TILE_GRASS; // village zone
    } else {
      groundTile = TILE_GRASS; // river zone (placeholder)
    }

    groundRow.push(groundTile);

    // 🌳 OBJECTS / RESOURCES
    let objectTile = 0;

    // Border walls (keep player inside world)
    if (
      row === 0 ||
      col === 0 ||
      row === MAP_ROWS - 1 ||
      col === MAP_COLS - 1
    ) {
      objectTile = TILE_WALL;
    } else {
      // Random resource placement
      if (Math.random() < 0.05) {
        objectTile = TILE_RESOURCE;
      }
    }

    objectRow.push(objectTile);
  }

  groundLayer.push(groundRow);
  objectLayer.push(objectRow);
}

// DRAW MAP (CAMERA-BASED)
function drawMap(ctx, canvas) {
  const startCol = Math.floor(camera.x / tileSize);
  const endCol = startCol + Math.ceil(canvas.width / tileSize);

  const startRow = Math.floor(camera.y / tileSize);
  const endRow = startRow + Math.ceil(canvas.height / tileSize);

  for (let row = startRow; row < endRow; row++) {
    for (let col = startCol; col < endCol; col++) {
      // Prevent out-of-bounds errors
      if (!groundLayer[row] || groundLayer[row][col] === undefined) continue;

      const worldX = col * tileSize;
      const worldY = row * tileSize;

      const screenX = worldX - camera.x;
      const screenY = worldY - camera.y;

      // 🌱 DRAW GROUND
      const groundTile = groundLayer[row][col];

      if (groundTile === TILE_GRASS) {
        ctx.fillStyle = "#4CAF50";
      }

      ctx.fillRect(screenX, screenY, tileSize, tileSize);

      // 🌳 DRAW OBJECTS
      const objectTile = objectLayer[row][col];

      if (objectTile === TILE_WALL) {
        ctx.fillStyle = "#555";
        ctx.fillRect(screenX, screenY, tileSize, tileSize);
      }

      if (objectTile === TILE_RESOURCE) {
        ctx.fillStyle = "#8B5A2B";
        ctx.fillRect(screenX + 8, screenY + 8, tileSize - 16, tileSize - 16);
      }
    }
  }
}

//COLLISION / INTERACTION
function getObjectAtPixel(x, y) {
  const col = Math.floor(x / tileSize);
  const row = Math.floor(y / tileSize);

  return objectLayer[row]?.[col];
}

//SET OBJECT TILE (e.g. after collecting resource)
function setObjectAtPixel(x, y, value) {
  const col = Math.floor(x / tileSize);
  const row = Math.floor(y / tileSize);

  if (objectLayer[row]) {
    objectLayer[row][col] = value;
  }
}
