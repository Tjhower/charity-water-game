// CAMERA
const camera = {
  x: 0,
  y: 0,
};

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // --- TITLE SCREEN SETUP ---
  let titleReady = false;
  const titleImage = new Image();
  titleImage.src = "img//wombat-well-builder-title.svg";
  titleImage.onload = () => {
    titleReady = true;
  };
  titleImage.onerror = () => {
    console.error("Failed to load title image");
  };

  let playButtonReady = false;
  const playButton = new Image();
  playButton.src = "img//play-button.svg";
  playButton.onload = () => {
    playButtonReady = true;
  };
  playButton.onerror = () => {
    console.error("Failed to load play button");
  };

  // --- START GAME ON CLICK ---
  canvas.addEventListener("click", () => {
    if (gameState === "title") {
      setState("map");
    }
  });

  // --- GAME LOOP ---
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "title") {
      drawTitle();
    }

    if (gameState === "map") {
      // Update player movement
      updatePlayer();
      // Update camera position
      updateCamera();
      // Draw map layers
      drawMap(ctx, canvas); // ground + objects
      drawResources(ctx); // resources
      // Draw player
      drawPlayer(ctx, canvas);
    }

    if (gameState === "minigame") {
      drawMinigame();
    }

    requestAnimationFrame(gameLoop);
  }

  // --- TITLE SCREEN DRAW ---
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

    if (playButtonReady) {
      const imgRatio = playButton.width / playButton.height;
      const canvasRatio = canvas.width / canvas.height;
      let drawWidth, drawHeight;
      if (imgRatio > canvasRatio) {
        drawWidth = canvas.width / 3;
        drawHeight = drawWidth / imgRatio;
      } else {
        drawHeight = canvas.height / 2.5;
        drawWidth = drawHeight * imgRatio;
      }
      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2 + 300;
      ctx.drawImage(playButton, x, y, drawWidth, drawHeight);
    }
  }

  // --- CAMERA UPDATE ---
  function updateCamera() {
    camera.x = player.x + player.size / 2 - canvas.width / 2;
    camera.y = player.y + player.size / 2 - canvas.height / 2;

    const maxX = MAP_COLS * tileSize - canvas.width;
    const maxY = MAP_ROWS * tileSize - canvas.height;

    camera.x = Math.max(0, Math.min(camera.x, maxX));
    camera.y = Math.max(0, Math.min(camera.y, maxY));
  }

  // Load images
  for (const [type, src] of Object.entries(resourceTypes)) {
    const img = new Image();
    img.src = src;
    resourceImages[type] = img;
  }

  function drawResources(ctx) {
    for (let row = 0; row < MAP_ROWS; row++) {
      for (let col = 0; col < MAP_COLS; col++) {
        const type = resourceLayer[row][col];
        if (type && resourceImages[type]?.complete) {
          const x = col * tileSize - camera.x;
          const y = row * tileSize - camera.y;
          ctx.drawImage(resourceImages[type], x, y, tileSize, tileSize);
        }
      }
    }
  }

  // --- MINIGAME PLACEHOLDER ---
  function drawMinigame() {
    ctx.fillStyle = "white";
    ctx.font = "24px monospace";
    ctx.fillText(
      "Minigame Triggered!",
      canvas.width / 2 - 100,
      canvas.height / 2,
    );
  }

  gameLoop();
});
