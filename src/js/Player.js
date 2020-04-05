class Player {
  constructor() {
    this.bet = 0;
    this.bank = 1000;
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
}
