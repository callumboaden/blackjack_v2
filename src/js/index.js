// Global game state
const state = {};

init();

// BET CONTROLLER
elements.betButtons.addEventListener("click", controlBet);

function controlBet(evt) {
  // Get input from UI
  const input = gameView.getBetAmount(evt);

  // Update Player bet
  const { betTotal, bankTotal } = state.game.player.addBet(input);

  // Update Ui
  gameView.updateTotals(betTotal, bankTotal)
}

function init() {
  state.game = new Game();

  console.log(state);
}
