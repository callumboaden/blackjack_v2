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
  renderPlayerHandList: ({ handList }) => {
    const markup = handList
      .map((hand, i) => renderPlayerHand(hand, i))
      .join("");
    elements.playerHandListDisplay.insertAdjacentHTML("beforeend", markup);
  },
  renderDealer: ({ dealer, isPlaying }) => {
    const markup = `
        <div class="dealer__hand__cards">
            ${renderDealerCards(dealer.cards, isPlaying)}
        </div>
        ${ !isPlaying ? `<div class="dealer__hand__score">${dealer.score}</div>` : ''}
        
      `;
    elements.dealerHandDisplay.insertAdjacentHTML("beforeend", markup);
  },
};

function renderPlayerHand(hand, index) {
  return `
    <div class="player__hand player__hand-index-${index}">
        <div class="player__hand__cards">
            ${hand.cards
              .map((card) => {
                return `
                    <img src="./assets/images/cards/${card.imgURL}" />
                `;
              })
              .join("")}
        </div>
        <div class="player__hand__score">${hand.score}</div>
    </div>
    `;
}

function renderDealerCards(cards, isPlaying) {
  let markup = "";

  if (isPlaying) {
    markup = cards
      .map((card, i) => {
        // hide second card, show back of card
        console.log(i)
        if (i === 1) {
            
          return `<img src="./assets/images/cards/BC.svg" />`;
        } else {
            return `
                <img src="./assets/images/cards/${card.imgURL}" />
            `;
        }


      })
      .join("");
  } else {
    markup = cards
      .map((card) => `<img src="./assets/images/cards/${card.imgURL}" />`)
      .join("");
  }

  return markup;
}
