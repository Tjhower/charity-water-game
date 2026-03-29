// GAME STATE
// Global state variable
let gameState = "title";

// Optional: track previous state (useful later)
let previousState = null;
// STATE SETTER

function setState(newState) {
  if (gameState === newState) return;

  console.log(`State change: ${gameState} → ${newState}`);

  previousState = gameState;
  gameState = newState;

  updateUI();

  // Optional: handle enter logic
  onStateEnter(newState);
}

// STATE ENTER LOGIC
function onStateEnter(state) {
  switch (state) {
    case "title":
      // Reset anything if needed
      break;

    case "map":
      // Could reset player position later
      break;

    case "minigame":
      console.log("Minigame started!");
      break;
  }
}

// UI UPDATE (optional but helpful)

function updateUI() {
  const stateText = document.getElementById("stateText");

  if (!stateText) return;

  switch (gameState) {
    case "title":
      stateText.textContent = "Title Screen";
      break;

    case "map":
      stateText.textContent = "Exploring Map";
      break;

    case "minigame":
      stateText.textContent = "Minigame!";
      break;
  }
}
