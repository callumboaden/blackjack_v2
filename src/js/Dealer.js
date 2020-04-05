class Dealer {
    constructor() {
        this.cards = [];
        this.score = 0;
    }
    reset() {
        this.cards = [];
        this.score = 0;
    }
    calculateScore() {
        let score = 0;

        for (let i = 0; i < this.cards.length; i++) {
            score += this.cards[i].weight;
        }

        this.score = score;
        return this.score;
    }
}