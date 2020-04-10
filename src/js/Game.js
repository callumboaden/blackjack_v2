class Game {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
    this.isPlaying = false;
    this.isGameOver = false;
  }
  reset() {
    this.isGameOver = false;
    this.startGame();
    this.player.reset();
    this.dealer.reset();
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
      // check is > 21 then move to next hand
      if (activeHand.isTooMany()) {
        activeHand.status = 'bust'
        activeHand.win = 0;
        this.player.nextHand();
        console.log('too many')
      }

      return activeHand;
    }
  }
  splitHand() {
    let activeHand = this.player.getActiveHand();
    let removedCard = activeHand.cards.pop();
    let newHandCards = [removedCard, this.deck.getNextCard()];

    this.player.addHand(new Hand(newHandCards, activeHand.bet));

    activeHand.cards.push(this.deck.getNextCard());
    activeHand.calculateScore();
  }
  standHand() {
    this.isPlaying ? this.player.nextHand() : '';
  }
  doubleHand() {
    if (this.isPlaying) {
      // Get current hand
      let activeHand = this.player.getActiveHand();

      // Update total bet amount 
      this.player.bet += activeHand.bet;
      this.player.bank -= activeHand.bet;

      // Double bet 
      activeHand.doubleBet();

      // Get new card
      activeHand.cards.push(this.deck.getNextCard());
      activeHand.calculateScore();

      // go to next hand
      this.player.nextHand();
    }
  }
  dealerTurn() {
    while (this.dealer.score < 16) {
      this.dealer.cards.push(this.deck.getNextCard());
      this.dealer.calculateScore();
    }

    this.isPlaying = false;
  }
  checkWinner() {
    console.log('checking winner');

    this.player.handList.forEach(hand => {

      if (hand.score === this.dealer.score) {
        hand.status = 'push';
        hand.win = hand.bet;
      } else if (hand.score === 21 && hand.cards.length === 2) {
        hand.status = 'blackjack';
        hand.win = (hand.bet * 2) * 1.5
      } else if (this.dealer.score > 21 && hand.score <= 21) {
        hand.status = 'win';
        hand.win = hand.bet * 2;
      } else if (this.dealer.score > hand.score && this.dealer.score <= 21) {
        hand.status = 'lose';
        hand.win = 0;
      } else if (this.dealer.score < hand.score && hand.score <= 21) {
        hand.status = 'win';
        hand.win = hand.bet * 2;
      } else {
        hand.status = 'bust';
        hand.win = 0;
      }


      // Testing 
      /*
      console.log('Dealer score: ' + this.dealer.score);
      console.log('Player score: ' + hand.score);
      console.log('-----------------------------------')
      console.log('Hand status: ' + hand.status);
      console.log('Hand win: ' + hand.win);
      */

      this.player.bank += hand.win; 
      
    });

    this.isGameOver = true;
  
  }
}
