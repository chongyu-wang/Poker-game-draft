
class Hand {
    constructor(card1, card2) {
        this.card1 = card1;
        this.card2 = card2;
    }
    printHand() {
        console.log(this.card1.name);
        console.log(this.card2.name);
        console.log("*****************");
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.cash = 0;
        this.hand = null;

        this.button = null;
        this.folded = false;

        this.ranking = null;
    }
    updateHand(hand) {
        this.hand = hand;
    }
    updateButton(button) {
        this.button = button;
    }
    buyIn(amount) {
        this.cash += amount;
    }
    bet(amount) {
        this.cash -= amount;
        return amount;
    }
    printHand() {
        this.hand.printHand();
    }
}

module.exports = {Hand, Player};