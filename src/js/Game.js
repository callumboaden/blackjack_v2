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
  hitPlayer() {
    // Player can hit if playing 
    if (this.isPlaying) {
      // get active hand
      const activeHand = this.player.getActiveHand();
      // get new card 
      const newCard = this.deck.getNextCard();
      // push new card into hand
      activeHand.cards.push(newCard);
      // update score
      activeHand.calculateScore();
      
      return activeHand;
    }

    return;
  }
}
