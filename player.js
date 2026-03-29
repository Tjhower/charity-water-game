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
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

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

  // COLLISION CHECK (assuming player is centered on tile)
  const centerX = newX + player.size / 2;
  const centerY = newY + player.size / 2;

  const tileX = Math.floor(centerX / tileSize);
  const tileY = Math.floor(centerY / tileSize);

  // Prevent out-of-bounds
  if (!objectLayer[tileY] || objectLayer[tileY][tileX] === undefined) {
    return;
  }

  const tile = objectLayer[tileY][tileX];

  // TILE INTERACTIONS
  // 🚧 WALL (block movement)
  if (tile === TILE_WALL) {
    return;
  }
  // 🌳 RESOURCE (trigger minigame + remove)
  if (tile === TILE_RESOURCE) {
    alert("Minigame triggered!");
    setState("minigame");

    // Remove resource from map
    objectLayer[tileY][tileX] = 0;
  }
  // APPLY MOVEMENT
  player.x = newX;
  player.y = newY;
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
