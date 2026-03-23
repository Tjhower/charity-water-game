let player = {
  x: 1,
  y: 1,
  size: tileSize
};

function drawPlayer(ctx){
  ctx.fillStyle = "brown";
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

document.addEventListener("keydown", (e) => {

  if(gameState !== "map") return;

  let newX = player.x;
  let newY = player.y;

  if(e.key === "ArrowUp") newY--;
  if(e.key === "ArrowDown") newY++;
  if(e.key === "ArrowLeft") newX--;
  if(e.key === "ArrowRight") newX++;

  let tile = map[newY][newX];

  // collision check
  if(tile === 1){
    return; // wall
  }

  // material trigger
  if(tile === 2){
    alert("Minigame triggered!");
    setState("minigame");

    // remove material after collecting
    map[newY][newX] = 0;
  }

  player.x = newX;
  player.y = newY;

});