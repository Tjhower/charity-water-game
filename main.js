const camera = {
  x: 0,
  y: 0,
};
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
  let playButtonReady = false;
  const playButton = new Image();
  playButton.onload = () => {
    console.log("Play button loaded!");
    playButtonReady = true;
  };
  playButton.onerror = () => {
    console.error("Play button failed to load!");
  };
  playButton.src = "img/play-button.svg";
  // GAME LOOP
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "title") {
      drawTitle();
    }

    if (gameState === "map") {
      updatePlayer();
      updateCamera(player);
      drawMap(ctx, canvas);
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
  // Set Game State
  canvas.addEventListener("click", () => {
    if (gameState === "title") {
      setState("map"); // now uses state.js version
    }
  });
  // Camera setup
  function updateCamera(player) {
    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;

    const maxX = MAP_COLS * tileSize - canvas.width;
    const maxY = MAP_ROWS * tileSize - canvas.height;

    camera.x = Math.max(0, Math.min(camera.x, maxX));
    camera.y = Math.max(0, Math.min(camera.y, maxY));
  }
  function drawMinigame() {
    ctx.fillStyle = "white";
    ctx.font = "20px monospace";
    ctx.fillText("Minigame Placeholder", 180, 220);
  }

  gameLoop();
});
