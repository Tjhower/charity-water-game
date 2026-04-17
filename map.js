// TILE SETTINGS
const tileSize = 64;

// MAP DIMENSIONS
const MAP_COLS = 100;
const MAP_ROWS = 100;

// TILE TYPES
const TILE_GRASS = 0;
const TILE_WALL = 1; // Border walls
const TILE_TREE = 2; // Obstacles inside map
const TILE_ROCK = 3;
const TILE_WOOD = 4;
const TILE_ROPE = 5;
const TILE_BUCKET = 6;
const TILE_PULLEY = 7;

// LAYERS
const groundLayer = [];
const objectLayer = []; // Trees, walls
const resourceLayer = []; // Rocks, wood, rope, bucket, pulley

// GENERATE MAP
for (let row = 0; row < MAP_ROWS; row++) {
  const groundRow = [];
  const objectRow = [];
  const resourceRow = [];

  for (let col = 0; col < MAP_COLS; col++) {
    // 🌿 Ground
    let groundTile = TILE_GRASS;
    groundRow.push(groundTile);

    // 🌳 Obstacles
    let objectTile = 0;
    1;
    2;
    // Border walls
    if (
      row === 0 ||
      col === 0 ||
      row === MAP_ROWS - 1 ||
      col === MAP_COLS - 1
    ) {
      objectTile = TILE_WALL;
    }
    // Trees
    const fixedTrees = [
      { x: 10, y: 10 },
      { x: 15, y: 22 },
    ];
    fixedTrees.forEach((t) => {
      objectLayer[t.y][t.x] = TILE_TREE;
    });

    objectRow.push(objectTile);

    // Resources layer (empty for now)
    resourceRow.push(0);
  }

  groundLayer.push(groundRow);
  objectLayer.push(objectRow);
  resourceLayer.push(resourceRow);
}

// PLACE UNIQUE RESOURCES (1 of each)
function placeResource(tileType) {
  let placed = false;
  while (!placed) {
    const row = Math.floor(Math.random() * (MAP_ROWS - 2)) + 1;
    const col = Math.floor(Math.random() * (MAP_COLS - 2)) + 1;

    // Only place if no obstacle or other resource
    if (objectLayer[row][col] === 0 && resourceLayer[row][col] === 0) {
      resourceLayer[row][col] = tileType;
      placed = true;
    }
  }
}

// Place one of each resource
placeResource(TILE_ROCK);
placeResource(TILE_WOOD);
placeResource(TILE_ROPE);
placeResource(TILE_BUCKET);
placeResource(TILE_PULLEY);

// DRAW MAP (CAMERA-BASED)
function drawMap(ctx, canvas) {
  const startCol = Math.floor(camera.x / tileSize);
  const endCol = startCol + Math.ceil(canvas.width / tileSize);
  const startRow = Math.floor(camera.y / tileSize);
  const endRow = startRow + Math.ceil(canvas.height / tileSize);

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      if (!groundLayer[row] || !groundLayer[row][col]) continue;

      const worldX = col * tileSize;
      const worldY = row * tileSize;
      const screenX = worldX - camera.x;
      const screenY = worldY - camera.y;

      // Draw ground
      ctx.fillStyle = "#4CAF50"; // grass
      ctx.fillRect(screenX, screenY, tileSize, tileSize);

      // Draw objects
      const objTile = objectLayer[row][col];
      if (objTile === TILE_WALL) {
        ctx.fillStyle = "#555"; // wall
        ctx.fillRect(screenX, screenY, tileSize, tileSize);
      } else if (objTile === TILE_TREE) {
        ctx.fillStyle = "#228B22"; // tree
        ctx.fillRect(screenX + 8, screenY + 8, tileSize - 16, tileSize - 16);
      }
    }
  }
}

// COLLISION CHECKS
function getObjectAtPixel(x, y) {
  const col = Math.floor(x / tileSize);
  const row = Math.floor(y / tileSize);

  return objectLayer[row]?.[col];
}

function setObjectAtPixel(x, y, value) {
  const col = Math.floor(x / tileSize);
  const row = Math.floor(y / tileSize);

  if (objectLayer[row]) objectLayer[row][col] = value;
}

// RESOURCE HELPERS
function getResourceAtPixel(x, y) {
  const col = Math.floor(x / tileSize);
  const row = Math.floor(y / tileSize);

  return resourceLayer[row]?.[col];
}

function setResourceAtPixel(x, y, value) {
  const col = Math.floor(x / tileSize);
  const row = Math.floor(y / tileSize);

  if (resourceLayer[row]) resourceLayer[row][col] = value;
}
