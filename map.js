const TILE_SIZE = 64;

const map = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,2,0,0,0,2,0,0,1],
  [1,0,0,0,1,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1],
];

function drawMap(ctx) {
  const canvas = ctx.canvas;

  const startCol = Math.floor(camera.x / TILE_SIZE);
  const endCol = startCol + Math.ceil(canvas.width / TILE_SIZE);

  const startRow = Math.floor(camera.y / TILE_SIZE);
  const endRow = startRow + Math.ceil(canvas.height / TILE_SIZE);

  for (let row = startRow; row < endRow; row++) {
    for (let col = startCol; col < endCol; col++) {
      if (!map[row] || map[row][col] === undefined) continue;

      const tile = map[row][col];

      const worldX = col * TILE_SIZE;
      const worldY = row * TILE_SIZE;

      const screenX = worldX - camera.x;
      const screenY = worldY - camera.y;

      if (tile === 0) ctx.fillStyle = "green";
      else if (tile === 1) ctx.fillStyle = "gray";
      else if (tile === 2) ctx.fillStyle = "brown";

      ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
    }
  }
}