class Hand {
    constructor(cards, bet) {
        this.cards = cards;
        this.score = 0;
        this.bet = bet;
        this.status = '';
        this.win = '';
    }
    calculateScore() {
        let hasAce = false;
        let score = 0;

        for (let i = 0; i < this.cards.length; i++) {
            
            this.cards[i].value === "A" ? hasAce = true : false;

            score += this.cards[i].weight;
        }  

        if (hasAce && score > 21) {
            score = 0
            // Recalculate score 
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i].value === "A") {
                    this.cards[i].weight = 1;
                }

                score += this.cards[i].weight;
            }

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