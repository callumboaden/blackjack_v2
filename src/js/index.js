// Global game state
const state = {};

init();

// BET CONTROLLER
elements.betButtons.addEventListener("click", controlBet);
elements.playButtons.addEventListener("click", controlPlay);

function controlBet(evt) {
  if (state.game.isGameOver) {
    console.log("reset");
    state.game.reset();

    // Update UI
    gameView.updateTotals(state.game.player.bet, state.game.player.bank);
    gameView.clearDealerHandDisplay();
    gameView.clearPlayerHandDisplay();
  }
  // Get input from UI
  const input = gameView.getBetAmount(evt);

  // Update Player bet
  const { betTotal, bankTotal } = state.game.player.addBet(input);

  // Update Ui
  gameView.updateTotals(betTotal, bankTotal);
}

function controlPlay(evt) {
  const action = gameView.getPlayerAction(evt);

  action === "deal"
    ? controlDeal()
    : action === "hit"
    ? controlHit()
    : action === "stand"
    ? controlStand()
    : action === "split"
    ? controlSplit()
    : action === "double"
    ? controlDouble()
    : "";
  // action === 'surrender' ? controlDeal() :
  // action === 'insurance' ? controlDeal() :
}

function controlDeal() {
  const playerBet = state.game.player.getBetAmount();

  if (playerBet && !state.game.isGameOver) {
    // Deal cards to players
    state.game.deal();

    // Update UI
    gameView.renderDealer(state.game);
    gameView.renderPlayerHandList(state.game.player);
    gameView.hideBetButtons();
  }

  if (state.game.player.isSplitHand()) {
    console.log('can split hand')
  }


}

function controlHit() {
  if (!state.game.isGameOver ) {
    const activeHand = state.game.hitPlayer();
  }

  if (state.game.player.isPlayerTurnOver()) {
    console.log("player turn is over");
    console.log('active hand: ' + state.game.player.activeHand)
    console.log('total hands: ' + state.game.player.handList.length)

    if (state.game.player.handList > 1) {
      // Dealer turn
      state.game.dealerTurn();
      gameView.clearDealerHandDisplay();
      gameView.renderDealer(state.game);
    }

    // Check Winner
    state.game.checkWinner();
    gameView.showBetButtons();
  }

  // Prepare UI for changes
  gameView.clearPlayerHandDisplay();
  gameView.renderPlayerHandList(state.game.player);
}

function controlStand() {
  console.log('stand hand');
  console.log(state.game.player.activeHand);
  !state.game.isGameOver && state.game.standHand();

  if (state.game.player.isPlayerTurnOver()) {
    console.log("player turn is over");

    // Dealer turn
    state.game.dealerTurn();
    // Check Winner
    state.game.checkWinner();

    // Prepare UI for changes
    gameView.clearPlayerHandDisplay();
    gameView.clearDealerHandDisplay();

    // Render dealer on UI
    gameView.showBetButtons();
    gameView.renderPlayerHandList(state.game.player);
    gameView.renderDealer(state.game);
  }
}

function controlSplit() {
  if (state.game.player.isSplitHand()) {
    console.log('splitting hand');
    state.game.splitHand();

    // Prepare UI for changes
    gameView.clearPlayerHandDisplay();
    gameView.renderPlayerHandList(state.game.player);

    console.log(state.game);
  }
}

function init() {
  state.game = new Game();
  state.game.startGame();
}
