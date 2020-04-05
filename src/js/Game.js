class Game {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }
  startGame() {
    this.deck.createDeck();
    this.deck.shuffleDeck();
  }
  deal() {
    const playerHand = new Hand(
      this.deck.createHand(),
      this.player.getBetAmount()
    );

    

    this.player.addHand(playerHand);
    this.dealer.cards.push(
        this.deck.getNextCard(),
        this.deck.getNextCard()
    );

  }
}
