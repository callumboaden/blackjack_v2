class Hand {
    constructor(cards, bet) {
        this.cards = cards;
        this.score = 0;
        this.bet = bet;
    }
    calculateScore() {
        let score = 0;

        for (let i = 0; i < this.cards.length; i++) {
            score += this.cards[i].weight;
        }

        this.score = score;
        
    }
}