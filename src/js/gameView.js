

const gameView = {
    getBetAmount: (evt) => {
        return evt.target.dataset.bet;
    },
    updateTotals: (betTotal, bankTotal) => {
        elements.playerBetDisplay.textContent = betTotal;
        elements.playerBankDisplay.textContent = bankTotal;
    }
}
