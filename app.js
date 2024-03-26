const express = require("express");
const bodyParser = require("body-parser");
const Game = require(__dirname + "/game.js");
const Ranking = require(__dirname + "/logic/ranking.js");

const app = express();
const NUMPLAYERS = 5;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/views"));
app.set('view engine', 'ejs');

const game = new Game(NUMPLAYERS);


function sortTurn(cT) {
    game.pokerTable.activePlayers -= game.foldAmount;
    game.foldAmount = 0;
    switch(cT) {
        case "pf":
            game.flop();
            setPlayerRankings();
            break;
        case "f":
            game.turn();
            setPlayerRankings();
            break;
        case "t":
            game.river();
            setPlayerRankings();
            break;
        case "r":
            game.getWinner();
            game.preflop();
            game.deal();
            break;
    }
}

function getAdminChoice(choice) {
    switch(choice) {
        case "Initialize":
            game.initialize();
            break;
        case "Deal":
            game.deal();
            break;
        case "Turn":
            game.turn();
            break;
        case "River":
            game.river();
            break;
        case "Flop":
            game.flop();
            break;
        case "Switch Blinds":
            game.alternateBlinds();
            break;
    }
}

function getPlayerChoice(c) {
    switch(c) {
        case "Call":
            game.call();
            break;
        case "Raise":
            game.raise(game.potAmount);
            break;
        case "Check":
            break;
        case "Fold":
            game.fold()
            break;
    }
    game.pokerTable.switchCurrentPlayer();
    game.isRaise = false;
}

const ranking = new Ranking();

function setPlayerRankings() {
    game.pokerTable.playerlist.forEach(player => {
        player.ranking = ranking.getRanking(player, game.table);
    });
}

app.get("/", function(req, res) {
    if (game.playersWent === game.pokerTable.activePlayers) {
        sortTurn(game.curTurn);
    }
    res.render("home", {cards: game.table, 
        players: game.pokerTable.playerlist, 
        deck: game.deck, 
        choice: game.choice,
        currentplayer: game.pokerTable.getCurrentPlayer(),
        potAmount: game.potAmount,
        curBet: game.curBet,
        table: game.table
    });

});

app.post("/", function(req, res) {
    if (req.body["buttonPressed"]){
        const buttonPressed = req.body.buttonPressed;
        getPlayerChoice(buttonPressed);
        game.playersWent++;
    } else {
        const adminButton = req.body.adminButton;
        getAdminChoice(adminButton);
    }
    res.redirect("/");
});



app.listen("3000", function() {
    console.log("Server running on port 3000")
});