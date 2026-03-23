const tileSize = 32;

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 2, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 2, 1, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

function drawMap(ctx) {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      let tile = map[row][col];

      if (tile === 1) {
        ctx.fillStyle = "#333"; // wall
      } else if (tile === 2) {
        ctx.fillStyle = "gold"; // material
      } else {
        ctx.fillStyle = "#7ec850"; // grass
      }

      ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
    }
  }
}
