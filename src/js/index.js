
const elements = {
    dealButton: document.querySelector('.button__deal'),
    clearBetButton: document.querySelector('.button__clear-bet'),
    playerBankDisplay: document.querySelector('.player__bank__display__amount'),
    playerBetDisplay: document.querySelector('.player__bet__display__amount'),
    betButtons: document.querySelector('.buttons__bet'),
}

// Global game state 
const state = {};

init();

// Event listener for bet buttons 
elements.betButtons.addEventListener('click', e => {
    let betAmount = 0;

    // get player bet from UI
    betAmount = parseInt(e.target.dataset.bet);

    if (state.player.bank >= betAmount) {
        
        // update state
        state.player.bet += betAmount;
        state.player.bank -= betAmount;

        // prepare UI for changes
        elements.playerBetDisplay.innerHTML = '';
        elements.playerBankDisplay.innerHTML = '';

        // update UI
        elements.playerBetDisplay.textContent = state.player.bet;
        elements.playerBankDisplay.textContent = state.player.bank;
    }

});

// Event listener for clear bet button 
elements.clearBetButton.addEventListener('click', () => {

    // add bet to bank total
    state.player.bank += state.player.bet;

    // reset bet
    state.player.bet = 0;

    // prepare UI for changes
    elements.playerBetDisplay.innerHTML = '';
    elements.playerBankDisplay.innerHTML = '';

    // update UI
    elements.playerBetDisplay.textContent = state.player.bet;
    elements.playerBankDisplay.textContent = state.player.bank;
});


function init() {

}

