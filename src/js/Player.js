class Player {
  constructor() {
    this.bet = 0;
    this.bank = 1000, 
    this.handList = []
  }

  addBet(bet) {

    if (this.bank >= bet) {
        this.bet += parseInt(bet);
        this.bank -= parseInt(bet);
    }

    return { betTotal: this.bet, bankTotal: this.bank };

  }
}
