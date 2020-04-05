class Hand {
    constructor(cards, bet) {
        this.cards = cards;
        this.score = 0;
        this.bet = bet;
        this.status = '';
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
    updateHandStatus() {
        if (this.score > 21) {
            this.status = 'bust';
        }

        return;
    }
}