// Global game state
const state = {};

init();

// BET CONTROLLER
elements.betButtons.addEventListener("click", controlBet);
elements.playButtons.addEventListener("click", controlPlay);

function controlBet(evt) {
  // Get input from UI
  const input = gameView.getBetAmount(evt);

  // Update Player bet
  const { betTotal, bankTotal } = state.game.player.addBet(input);

  // Update Ui
  gameView.updateTotals(betTotal, bankTotal)
}

function controlPlay(evt) {
    const playerBet = state.game.player.getBetAmount();
    const action = gameView.getPlayerAction(evt);

    action === 'deal' ? controlDeal() :
    action === 'hit' ? controlHit() :
    action === 'stand' ? controlStand() :
    action === 'split' ? controlSplit() :
    action === 'double' ? controlDouble() :
    // action === 'surrender' ? controlDeal() :
    // action === 'insurance' ? controlDeal() :

    console.log(action);
}

function controlDeal() {
    const playerBet = state.game.player.getBetAmount();

    if (playerBet) {
        // Deal cards to players
        state.game.deal();

        // Update UI
        gameView.renderPlayerHands(state.game.player);
        
    }


    console.log(state.game)
    
}

function init() {
  state.game = new Game();
  state.game.startGame();
}
