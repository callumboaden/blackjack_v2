const gameView = {
  getBetAmount: (evt) => {
    return evt.target.dataset.bet;
  },
  getPlayerAction: (evt) => {
    return evt.target.dataset.action;
  },
  updateTotals: (betTotal, bankTotal) => {
    elements.playerBetDisplay.textContent = betTotal;
    elements.playerBankDisplay.textContent = bankTotal;
  },
  renderPlayerHands: ({ handList }) => {
    const markup = handList.map((hand, i) => renderHand(hand, i)).join('');
    
    elements.playerHandListDisplay.insertAdjacentHTML('beforeend', markup);  
  },
};

function renderHand(hand, index) {
  return `
    <div class="player__hand player__hand-index-${index}">
        <div class="player__hand__cards">
            ${hand.cards.map(card => {
                return `
                    <img src="./assets/images/cards/${card.imgURL}" />
                `
            }).join('')}
        </div>
        <div class="player__hand__score">${hand.score}</div>
    </div>
    `;
}
