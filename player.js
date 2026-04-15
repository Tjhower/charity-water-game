// PLAYER SETUP
let player = {
  x: 300,
  y: 300,
  size: 40,
  speed: 4,
};

// INPUT SYSTEM (SMOOTH MOVEMENT)
const keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;

  // Check for resource interaction when pressing "E"
  if (e.key === "e" || e.key === "E") {
    interactWithResource();
  }
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// RESOURCE IMAGES
const resourceImages = {};

const resourceFiles = {
  [TILE_ROCK]: "img/resources/rock.png",
  [TILE_WOOD]: "img/resources/wood.png",
  [TILE_ROPE]: "img/resources/rope.png",
  [TILE_BUCKET]: "img/resources/bucket.png",
  [TILE_PULLEY]: "img/resources/pulley.png",
};

// Load all resource images
for (const [tile, path] of Object.entries(resourceFiles)) {
  const img = new Image();
  img.src = path;
  resourceImages[tile] = img;
}

// UPDATE PLAYER (CALLED IN GAME LOOP)
function updatePlayer() {
  if (gameState !== "map") return;

  let moveX = 0;
  let moveY = 0;

  // Movement input
  if (keys["ArrowUp"]) moveY -= 1;
  if (keys["ArrowDown"]) moveY += 1;
  if (keys["ArrowLeft"]) moveX -= 1;
  if (keys["ArrowRight"]) moveX += 1;

  // Normalize diagonal movement
  if (moveX !== 0 && moveY !== 0) {
    const length = Math.sqrt(moveX * moveX + moveY * moveY);
    moveX /= length;
    moveY /= length;
  }

  const newX = player.x + moveX * player.speed;
  const newY = player.y + moveY * player.speed;

  // COLLISION CHECK (using objectLayer)
  const centerX = newX + player.size / 2;
  const centerY = newY + player.size / 2;

  const tileX = Math.floor(centerX / tileSize);
  const tileY = Math.floor(centerY / tileSize);

  if (!objectLayer[tileY] || objectLayer[tileY][tileX] === undefined) return;

  const tile = objectLayer[tileY][tileX];

  // 🚧 WALL / TREE - block movement
  if (tile === TILE_WALL || tile === TILE_TREE) {
    return;
  }

  // APPLY MOVEMENT
  player.x = newX;
  player.y = newY;
}

// INTERACTION FUNCTION (1 TILE RANGE)
function interactWithResource() {
  const playerCenterX = player.x + player.size / 2;
  const playerCenterY = player.y + player.size / 2;

  // Check all tiles around the player (1-tile radius)
  const startCol = Math.floor((playerCenterX - tileSize) / tileSize);
  const endCol = Math.floor((playerCenterX + tileSize) / tileSize);
  const startRow = Math.floor((playerCenterY - tileSize) / tileSize);
  const endRow = Math.floor((playerCenterY + tileSize) / tileSize);

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      if (!resourceLayer[row] || resourceLayer[row][col] === undefined)
        continue;

      const resourceTile = resourceLayer[row][col];

      switch (resourceTile) {
        case TILE_ROCK:
          alert("Rock minigame triggered!");
          setState("minigame");
          return;
        case TILE_WOOD:
          alert("Wood minigame triggered!");
          setState("minigame");
          return;
        case TILE_ROPE:
          alert("Rope minigame triggered!");
          setState("minigame");
          return;
        case TILE_BUCKET:
          alert("Bucket minigame triggered!");
          setState("minigame");
          return;
        case TILE_PULLEY:
          alert("Pulley minigame triggered!");
          setState("minigame");
          return;
        default:
          break;
      }
    }
  }
}

// DRAW PLAYER
function drawPlayer(ctx, canvas) {
  ctx.fillStyle = "blue";
  ctx.fillRect(
    player.x - camera.x,
    player.y - camera.y,
    player.size,
    player.size,
  );
}

// DRAW RESOURCES (called in main drawMap loop or separately)
function drawResources(ctx) {
  for (let row = 0; row < resourceLayer.length; row++) {
    for (let col = 0; col < resourceLayer[row].length; col++) {
      const tile = resourceLayer[row][col];
      if (tile && resourceImages[tile]) {
        const screenX = col * tileSize - camera.x;
        const screenY = row * tileSize - camera.y;

        ctx.drawImage(
          resourceImages[tile],
          screenX,
          screenY,
          tileSize,
          tileSize,
        );
      }
    }
  }
}
