// Global game state
const state = {};

init();

// BET CONTROLLER
elements.betButtons.addEventListener("click", controlBet);
elements.playButtons.addEventListener("click", controlPlay);

function controlBet(evt) {
  const action = evt.target.dataset.action;
  const bet = evt.target.dataset.bet;

  if (state.game.isGameOver) {
    state.game.reset();

    // Update UI
    gameView.updateTotals(
      state.game.player.bet,
      state.game.player.bank,
      state.game.player.win
    );
    gameView.clearDealerHandDisplay();
    gameView.clearPlayerHandDisplay();
  }

  if (action === "clear") {
    state.game.player.clearBet();

    // Update Ui
    gameView.hidePlayButtons();
    gameView.updateTotals(
      state.game.player.bet,
      state.game.player.bank,
      state.game.player.win
    );
  }

  if (bet) {
    console.log('place bet');
    const input = gameView.getBetAmount(evt);
    state.game.player.addBet(input);
  
    // Update Ui
    gameView.showPlayButtons();
    gameView.updateTotals(
      state.game.player.bet,
      state.game.player.bank,
      state.game.player.win
    );
  }

  console.log(state.game)

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

  if (!state.game.isGameOver) {
    if (playerBet && !state.game.isPlaying) {
      // Deal cards to players
      state.game.deal();

      // Update UI
      gameView.renderDealer(state.game);
      gameView.renderPlayerHandList(state.game.player);
      gameView.hideBetButtons();
    }
  }
}

function controlHit() {
  console.log("Hit");

  if (!state.game.isGameOver && state.game.isPlaying) {
    state.game.hitPlayer();

    if (state.game.player.isPlayerTurnOver()) {
      if (state.game.player.handList.length > 1) {
        // Dealer turn
        state.game.dealerTurn();
        gameView.clearDealerHandDisplay();
        gameView.renderDealer(state.game);
      }

      // Check Winner
      state.game.checkWinner();
      gameView.hidePlayButtons();
      gameView.showBetButtons();
    }

    // Prepare UI for changes
    gameView.clearPlayerHandDisplay();

    // Update Ui with changes
    gameView.renderPlayerHandList(state.game.player);
  }

  console.log(state.game);
}

function controlStand() {
  console.log("Stand");

  !state.game.isGameOver && state.game.standHand();

  if (state.game.player.isPlayerTurnOver()) {
    // Dealer turn
    state.game.dealerTurn();
    // Check Winner
    state.game.checkWinner();

    // Prepare UI for changes
    gameView.clearDealerHandDisplay();

    // Render dealer on UI
    gameView.hidePlayButtons();
    gameView.showBetButtons();
    gameView.renderDealer(state.game);

    // Update Player Totals
    gameView.updateTotals(
      state.game.player.bet,
      state.game.player.bank,
      state.game.player.win
    );
  }

  gameView.clearPlayerHandDisplay();
  gameView.renderPlayerHandList(state.game.player);

  console.log(state.game);
}

function controlSplit() {
  console.log("Split");

  if (state.game.player.isSplitHand()) {
    state.game.splitHand();

    // Prepare UI for changes
    gameView.clearPlayerHandDisplay();

    // Update UI
    gameView.renderPlayerHandList(state.game.player);
    gameView.updateTotals(
      state.game.player.bet,
      state.game.player.bank,
      state.game.player.win
    );
    console.log(state.game);
  }
}

function controlDouble() {
  console.log("Double");

  !state.game.isGameOver && state.game.doubleHand();

  if (state.game.player.isPlayerTurnOver()) {
    // Dealer turn
    state.game.dealerTurn();
    // Check Winner
    state.game.checkWinner();

    // Prepare UI for changes
    gameView.clearPlayerHandDisplay();
    gameView.clearDealerHandDisplay();

    // Render dealer on UI
    gameView.hidePlayButtons();
    gameView.showBetButtons();
    gameView.renderPlayerHandList(state.game.player);
    gameView.renderDealer(state.game);
  }

  // Prepare UI for changes
  gameView.clearPlayerHandDisplay();
  gameView.renderPlayerHandList(state.game.player);  
  gameView.updateTotals(
    state.game.player.bet,
    state.game.player.bank,
    state.game.player.win
  );

  console.log(state.game);
}

function init() {
  state.game = new Game();
  state.game.startGame();

  // Update Ui
  gameView.updateTotals(
    state.game.player.bet,
    state.game.player.bank,
    state.game.player.win
  );
}
