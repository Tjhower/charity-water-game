document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  // const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//Load Title
const titleImage = document.getElementById("titleImage");

let titleReady = false;
titleImage.onload = () => {
  console.log("Image loaded!");
  titleReady = true;
};

titleImage.onerror = () => {
  console.error("Image failed to load!");
};



//Play Button Setup
const playButton = {
  x:860,
  y:600,
  
}


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
    if(titleImage.complete){
  ctx.drawImage(titleImage,760, 200, 400, 200);
    }
    let titleReady = false;
    const titleImage = new Image();
    titleImage.src = "img/wombat-well-builder-title.svg";

    titleImage.onload = () => {
         titleReady = true;
        };
          
  ctx.fillText("Click to Start", 220, 250);

  
}

function drawMinigame(){
  ctx.fillStyle = "white";
  ctx.font = "20px monospace";
  ctx.fillText("Minigame Placeholder", 180, 220);
}

gameLoop();