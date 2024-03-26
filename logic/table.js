class PokerTable {
    constructor(numPlayers) {
        this.size = numPlayers;
        this.playerlist = [];
        this.indexBB = this.size - 1;
        this.indexSB = this.size - 2;
        this.indexDealer = this.size - 3;
        this.indexCurrentPlayer = 0
        this.activePlayers = numPlayers;
    }
    addPlayer(player) {
        this.playerlist.push(player);
    }
    removePlayer(name) {
        this.playerlist.forEach(function(player) {
            if (player.name === name) {
                console.log(player);
            }
        });
    }
    initCurrentPlayer(stage) {
        if (stage === "PF") {
            this.indexCurrentPlayer = this.indexBB + 1;
            if (this.indexCurrentPlayer >= this.size) {
                this.indexCurrentPlayer = 0;
            }

        }
        else{
            this.indexCurrentPlayer = this.indexSB;
        }
    }
    switchCurrentPlayer() {
        this.indexCurrentPlayer++;
        if (this.indexCurrentPlayer >= this.size) {
            this.indexCurrentPlayer = 0;
        }

        while (this.playerlist[this.indexCurrentPlayer].folded) {
            this.indexCurrentPlayer++;
            if (this.indexCurrentPlayer >= this.size) {
                this.indexCurrentPlayer = 0;
            }
        }
    }
    getBB() {
        return this.playerlist[this.indexBB];
    }
    getSB() {
        return this.playerlist[this.indexSB];
    }
    getDealer() {
        return this.playerlist[this.indexDealer];
    }
    getCurrentPlayer() {
        return this.playerlist[this.indexCurrentPlayer];
    }
    rotateBlinds() {
        let prevBB = this.indexBB;
        this.indexBB++;
        if (this.indexBB >= this.size) {
            this.indexBB = 0;
        }
        let prevSB = this.indexSB;
        this.indexSB = prevBB;
        this.indexDealer = prevSB;
    }

    reset() {
        this.activePlayers = this.size;
    }

    printBlinds() {
        console.log("Dealer " + this.playerlist[this.indexDealer]);
        console.log("Small Blind " + this.playerlist[this.indexSB]);
        console.log("Big Blind " + this.playerlist[this.indexBB]);
    }

}

module.exports = PokerTable;

// let table = new PokerTable(5);

// table.addPlayer("p1");
// table.addPlayer("p2");
// table.addPlayer("p3");
// table.addPlayer("p4");
// table.addPlayer("p5");

// table.printBlinds();
// table.rotateBlinds();

// table.printBlinds();
// table.rotateBlinds();

// table.printBlinds();
// table.rotateBlinds();

// table.printBlinds();
// table.rotateBlinds();

// table.printBlinds();
// table.rotateBlinds();

