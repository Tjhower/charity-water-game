const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Start game on click
canvas.addEventListener("click", () => {
  if(gameState === "title"){
    setState("map");
  }
});

function gameLoop(){

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(gameState === "title"){
    drawTitle();
  }

  if(gameState === "map"){
    drawMap(ctx);
    drawPlayer(ctx);
  }

  if(gameState === "minigame"){
    drawMinigame();
  }

  requestAnimationFrame(gameLoop);
}

function drawTitle(){
  ctx.fillStyle = "white";
  ctx.font = "24px monospace";
  ctx.fillText("Wally the Wombat", 180, 200);
  ctx.fillText("Click to Start", 220, 250);
}

function drawMinigame(){
  ctx.fillStyle = "white";
  ctx.font = "20px monospace";
  ctx.fillText("Minigame Placeholder", 180, 220);
}

gameLoop();