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
      gameView.renderDealer(state.game)
      gameView.renderPlayerHandList(state.game.player);
      gameView.hideBetButtons();  
  } 
}

function controlHit() {
  // Add new card to Player hand
  const activeHand = state.game.hitPlayer();

  // If hand is bust move to next hand
  if (activeHand.status === 'bust') state.game.player.nextHand();

  if (state.game.player.isPlayerTurnOver) {
    console.log('player turn is over')
  }

  // Prepare UI for changes
  gameView.clearPlayerHandDisplay();
  // Render changes on UI
  gameView.renderPlayerHandList(state.game.player);
}

function controlStand() {
  const activeHand = state.game.standHand();

  if (state.game.player.isPlayerTurnOver) {
    console.log('player turn is over');

    // Dealer turn
    state.game.dealerTurn();

    // Prepare UI for changes 
    gameView.clearDealerHandDisplay();

    // Render dealer on UI
    gameView.renderDealer(state.game);

  }
}


function init() {
  state.game = new Game();
  state.game.startGame();
}
