const PokerTable = require(__dirname + '/logic/table.js');
const Deck = require(__dirname +'/logic/deck.js');
const player = require(__dirname + '/logic/player.js');
const Ranking = require(__dirname + '/logic/ranking.js');

let ranking = new Ranking();

class Game {
    constructor(numPlayers) {
        this.table = [];
        this.pokerTable = new PokerTable(numPlayers);
        this.deck = new Deck();
        this.CurrentPlayer = null;
        this.curBet = 20;
        this.numPlayers = numPlayers;
        this.choice = null;
        this.potAmount = 0;
        this.playersWent = 0;
        this.curTurn = null;
        this.isRaise = false;
        this.foldAmount = 0;

        this.initialize();
    }
    populate() {
        for (let i = 0; i < this.numPlayers; i++) {
            let p = new player.Player("Player " + (i + 1));
            this.pokerTable.addPlayer(p);
            console.log(i);
        }
    }
    alternateBlinds() {
        this.pokerTable.rotateBlinds();
        this.getButtons();
    }
    getButtons() {
        for (let i = 0; i < this.pokerTable.playerlist.length; i++) {
            this.pokerTable.playerlist[i].button = null;  
        }
        this.pokerTable.getBB().button = "BB";
        this.pokerTable.getSB().button = "SB";
        this.pokerTable.getDealer().button = "Dealer";
    }
    deal() {
        for (let i = 0; i < this.pokerTable.playerlist.length; i++) {
            let hand = new player.Hand(this.deck.popCard(), this.deck.popCard());
            this.pokerTable.playerlist[i].updateHand(hand);
            // console.log(this.pokerTable.playerlist[i]);
        }
    }
    addCard() {
        let c = this.deck.popCard();
        this.table.push(c);
    }
    preflop() {
        this.foldAmount = 0;
        this.pokerTable.playerlist.forEach(player => {
            player.folded = false;
        });
        this.table = [];
        this.deck = new Deck();
        this.potAmount = 0;
        this.curBet = 20;
        this.deck.shuffleCards();
        this.curTurn = "pf";

        this.alternateBlinds();
        this.pokerTable.reset();
        this.pokerTable.initCurrentPlayer("PF");
        this.playersWent = 0;
        this.addToPot(this.pokerTable.getBB(), 20);
        this.addToPot(this.pokerTable.getSB(), 10);
    }
    flop() {
        this.foldAmount = 0;
        this.curTurn = "f";
        this.playersWent = 0;

        this.pokerTable.initCurrentPlayer("F");
        this.curBet = 0;
        this.deck.popCard();
        for (let i = 0; i < 3; i++) {
            let c = this.deck.popCard();
            this.table.push(c);
        }
    }
    turn() {
        this.foldAmount = 0;
        this.curTurn = "t";
        this.playersWent = 0;
    
        this.pokerTable.initCurrentPlayer("F");
        this.curBet = 0;
        this.deck.popCard();
        this.addCard();
    }
    river() {
        this.foldAmount = 0;
        this.curTurn = "r";
        this.playersWent = 0;
    
        this.pokerTable.initCurrentPlayer("F");
        this.curBet = 0;
        this.deck.popCard();
        this.addCard();
    }
    call() {
        this.potAmount += this.pokerTable.getCurrentPlayer().bet(this.curBet);
    }
    check() {
        console.log("Checked");
    }
    raise(amount) {
        this.curBet = this.potAmount;
        this.potAmount += this.pokerTable.getCurrentPlayer().bet(amount);
        this.isRaise = true;
    }
    fold() {
        this.pokerTable.getCurrentPlayer().folded = true;
        this.foldAmount++;
    }
    addToPot(player, amount) {
        this.potAmount += player.bet(amount);
    }
    addCash(amount) {
        for (let i = 0; i < this.pokerTable.playerlist.length; i++) {
            this.pokerTable.playerlist[i].buyIn(amount);
        }
    }
    initialize() {
        this.table = [];
        this.pokerTable = new PokerTable(this.numPlayers);
        this.deck = new Deck();
        this.potAmount = 0;
        this.curBet = 20;
    
        this.deck.shuffleCards();
        this.populate(this.numPlayers);
        this.getButtons();
        this.addCash(1200);
        this.preflop();
    }
    getWinner() {
        ranking.getWinner(this.pokerTable.playerlist).buyIn(this.potAmount);
    }
}

module.exports = Game;