const gameView = {
  clearPlayerHandDisplay: () => (elements.playerHandListDisplay.innerHTML = ""),
  clearDealerHandDisplay: () => (elements.dealerHandDisplay.innerHTML = ""),
  getBetAmount: (evt) => {
    return evt.target.dataset.bet;
  },
  getPlayerAction: (evt) => {
    return evt.target.dataset.action;
  },
  updateTotals: (betTotal, bankTotal, winTotal) => {
    elements.playerBetDisplay.textContent = betTotal;
    elements.playerBankDisplay.textContent = bankTotal;
    elements.playerWinDisplay.textContent = winTotal;
  },
  renderPlayerHandList: ({ activeHand, handList }) => {
    const markup = handList
      .map((hand, i) => renderPlayerHand(activeHand, hand, i))
      .join("");

    elements.playerHandListDisplay.classList.add('active');
    elements.playerHandListDisplay.insertAdjacentHTML("beforeend", markup);
  },
  renderDealer: ({ dealer, isPlaying }) => {
    const markup = `
        <div class="dealer__hand__cards">
            ${renderDealerCards(dealer.cards, isPlaying)}
        </div>
        ${
          !isPlaying
            ? `<div class="dealer__hand__score">${dealer.score}</div>`
            : ""
        }
        
      `;
    elements.dealerHandDisplay.insertAdjacentHTML("beforeend", markup);
  },
  hideBetButtons: () => elements.betButtons.classList.remove("active"),
  hidePlayButtons: () => elements.playButtons.classList.remove("active"),
  showBetButtons: () => elements.betButtons.classList.add("active"),
  showPlayButtons: () => elements.playButtons.classList.add("active")
};

function renderPlayerHand(activeHand, hand, index) {

  const isActiveHand = activeHand === index ? 'player__hand--active' : '';

  return `
    <div class="player__hand player__hand-index-${index} ${isActiveHand}">
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
        <div class="player__hand__status">${hand.status}</div>
        <div class="player__hand__status">${hand.win}</div>
    </div>
    `;
}

function renderDealerCards(cards, isPlaying) {
  let markup = "";

  if (isPlaying) {
    markup = cards
      .map((card, i) => {
        // hide second card, show back of card
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
