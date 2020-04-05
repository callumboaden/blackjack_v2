class Game {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
    this.isPlaying = false;
  }
  startGame() {
    this.deck.createDeck();
    this.deck.shuffleDeck();
  }
  deal() {
    this.isPlaying = true;
    
    this.player.addHand(new Hand(
      this.deck.createHand(),
      this.player.getBetAmount()
    ));

    this.dealer.cards.push(
        this.deck.getNextCard(),
        this.deck.getNextCard()
    );

    this.dealer.calculateScore();

  }
}
