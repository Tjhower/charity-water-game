let gameState = "title";

function setState(newState){
  gameState = newState;
  document.getElementById("stateText").innerText = newState.toUpperCase();
}