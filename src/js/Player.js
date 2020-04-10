class Player {
  constructor() {
    this.bet = 0;
    this.bank = 1000;
    this.win = 0;
    this.handList = [];
    this.activeHand = 0;
  }
  reset() {
    this.bet = 0;
    this.win = 0;
    this.handList = [];
    this.activeHand = 0;
  }
  addHand(hand) {
    hand.calculateScore();
    this.handList.push(hand);
  }
  addBet(bet) {
    if (this.bank >= bet) {
      this.bet += parseInt(bet);
      this.bank -= parseInt(bet);
    }

    return { betTotal: this.bet, bankTotal: this.bank };
  }
  getBetAmount() {
    return this.bet;
  }
  getActiveHand() {
    return this.handList[this.activeHand];
  }
  nextHand() {
    this.activeHand++;
  }
  isSplitHand() {
    const activeHand = this.getActiveHand();
    return activeHand.cards[0].weight === activeHand.cards[1].weight;
  }
  isPlayerTurnOver() {
    return this.activeHand === this.handList.length;
  } 
}
