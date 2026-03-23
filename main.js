document.addEventListener("DOMContentLoaded", function () {
  //Get canvas properly
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  //Load Title
  let titleReady = false;

  const titleImage = new Image();

  titleImage.onload = () => {
    console.log("Image loaded!");
    titleReady = true;
  };

  titleImage.onerror = () => {
    console.error("Image failed to load!");
  };

  titleImage.src = "img/wombat-well-builder-title.svg";

  //Play Button Setup
  let playReady = false;

  const playButton = new Image();

  playButton.onload = () => {
    console.log("Play button image loaded!");
    playReady = true;
  };
  playButton.onerror = () => {
    console.error("Play button image failed to load!");
  };

  playButton.src = "img/play-button.svg";

  // Start game on click
  canvas.addEventListener("click", () => {
    if (gameState === "title") {
      setState("map");
    }
  });

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "title") {
      drawTitle();
    }

    if (gameState === "map") {
      drawMap(ctx, canvas);

      const startCol = Math.floor(camera.x / tileSize);
      const endCol = startCol + Math.ceil(canvas.width / tileSize);

      const startRow = Math.floor(camera.y / tileSize);
      const endRow = startRow + Math.ceil(canvas.height / tileSize);

      drawPlayer(ctx, canvas);
    }

    if (gameState === "minigame") {
      drawMinigame();
    }

    requestAnimationFrame(gameLoop);
  }

  //Title Screen
  function drawTitle() {
    if (titleReady) {
      const imgRatio = titleImage.width / titleImage.height;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth, drawHeight;

      if (imgRatio > canvasRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
      }

      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;

      ctx.drawImage(titleImage, x, y, drawWidth, drawHeight);
    }
    // Draw play button
    const imgRatio = playButton.width / playButton.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth, drawHeight;
    if (imgRatio > canvasRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
    }
    const x = (canvas.width - drawWidth) / 2;
    const y = (canvas.height - drawHeight) / 2 + 100; // Position below title
    ctx.drawImage(playButton, x, y, drawWidth, drawHeight);
  }
  // Camera setup
  const camera = {
    x: 0,
    y: 0,
  };

  function updateCamera(player) {
    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;
  }
  function drawMinigame() {
    ctx.fillStyle = "white";
    ctx.font = "20px monospace";
    ctx.fillText("Minigame Placeholder", 180, 220);
  }

  gameLoop();
  if (gameState === "map") {
    updateCamera(player);
    drawMap(ctx);
    drawPlayer(ctx);
  }
  const tileX = Math.floor(newX / tileSize);
  const tileY = Math.floor(newY / tileSize);

  let tile = map[tileY]?.[tileX];

  if (tile === 1) return;
  if (tile === 2) {
    alert("Minigame triggered!");
    setState("minigame");
    map[tileY][tileX] = 0;
  }

  player.x = newX;
  player.y = newY;
});
