let player = {
  x: 500,
  y: 500,
  size: 40,
  speed: 4,
};

function drawPlayer(ctx) {
  ctx.fillStyle = "blue";

  ctx.fillRect(
    player.x - camera.x,
    player.y - camera.y,
    player.size,
    player.size,
  );
}

document.addEventListener("keydown", (e) => {
  if (gameState !== "map") return;

  let newX = player.x;
  let newY = player.y;

  if (e.key === "ArrowUp") newY -= player.speed;
  if (e.key === "ArrowDown") newY += player.speed;
  if (e.key === "ArrowLeft") newX -= player.speed;
  if (e.key === "ArrowRight") newX += player.speed;

  // use player's center to determine tile collision
  const centerX = newX + player.size / 2;
  const centerY = newY + player.size / 2;
  const tileX = Math.floor(centerX / TILE_SIZE);
  const tileY = Math.floor(centerY / TILE_SIZE);

  if (!map[tileY] || map[tileY][tileX] === undefined) return; // treat out-of-bounds as blocked

  const tile = map[tileY][tileX];

  if (tile === 1) {
    return; // wall
  }

  if (tile === 2) {
    alert("Minigame triggered!");
    setState("minigame");
    map[tileY][tileX] = 0; // remove collected material
  }

  player.x = newX;
  player.y = newY;
});
