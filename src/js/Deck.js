class Deck {
  constructor() {
    this.deck = [];
  }

  createDeck() {
    let deck = [];
    const suits = ["hearts", "diamonds", "spades", "clubs"];
    const values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++) {
        let card = {
          suit: suits[i],
          value: values[j],
        };

        // Set card weight
        if (card.value === "J" || card.value === "Q" || card.value === "K") {
          card.weight = 10;
        } else if (card.value === "A") {
          card.weight = 11;
        } else {
          card.weight = parseInt(card.value);
        }

        // Set Image URL
        card.imgURL = `${card.value}${card.suit
          .split("")
          .splice(0, 1)
          .join("")
          .toUpperCase()}.svg`;

        deck.push(card);
      }
    }

    this.deck = deck;
    return this.deck;
  }

  shuffleDeck() {
    this.deck.forEach((card, i) => {
      let swapIndex = Math.floor(Math.random() * this.deck.length);
      let randomCard = this.deck[swapIndex];
      this.deck[i] = randomCard;
      this.deck[swapIndex] = card;
    });
  }

  createHand() {
    return [ this.getNextCard(), this.getNextCard() ];
  }

  getNextCard() {
    return this.deck.shift();
  }
}
