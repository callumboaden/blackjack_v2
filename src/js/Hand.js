class Hand {
    constructor(cards, bet) {
        this.cards = cards;
        this.score = 0;
        this.bet = bet;
        this.status = '';
        this.win = '';
    }
    calculateScore() {
        let score = 0;

        for (let i = 0; i < this.cards.length; i++) {
            score += this.cards[i].weight;
        }  

        this.score = score;
    }
    getScore() {
        return this.score;
    }
    doubleBet() {
        this.bet += this.bet;
    }
    isTooMany() {
        return this.score > 21;    
    }
}