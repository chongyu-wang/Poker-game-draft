// import {Card} from "./card.js";

const shuffle = require(__dirname + "/shuffle.js");
const Card = require(__dirname + "/card.js");

let SUITS = ["clubs", "diamonds", "hearts", "spades"];

let RANKS = ["2","3","4","5","6","7","8","9","10","jack","queen","king","ace"];


class Deck {
    constructor() {
        this.stck = [];
        this.value = 12;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 13; j++) {
                let card = new Card(SUITS[i], RANKS[j]);
                this.stck.push(card);
            }
        }
    }
    printCard() {
        for (let i = 0; i < this.stck.length; i++) {
            console.log(this.stck[i].filename);
        }
    }
    popCard() {
        let card = this.stck.pop();
        return card;
    }
    shuffleCards() {
        this.stck = shuffle(this.stck)
    }
}



module.exports = Deck;
// let deck = new Deck();

// deck.printCard();