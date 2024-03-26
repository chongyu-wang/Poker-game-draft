const player = require(__dirname + "/player.js");
const Card = require(__dirname + "/card.js");
const assert = require("assert");



const RANKS = {highCard: {value: 1, name: "High Card", high: null},
            pair: {value: 2, name: "Pair", high: null},
            twoPair: {value: 3, name: "Two Pair", high: null},
            trips: {value: 4, name: "Three of a Kind", high: null},
            straight: {value: 5, name: "Straight", high: null},
            flush: {value: 6, name: "Flush", high: null},
            fullHouse: {value: 7, name: "Full House", high: null},
            quads: {value: 8, name: "Four of a Kind", high: null},
            straightFlush: {value: 9, name: "Straight Flush", high: null},
            royalFlush: {value: 10, name: "Royal Flush", high: 14}
        
        }

class Ranking {
  constructor() {
      this.winner = null;
  }
  //takes in player input
  //returns the ranking e.g. "Full House" or "Two Pair"
  getRanking(player, table) {
    if (this.isQuads(player, table)) {
      let qVal = this.isQuads(player, table);
      return qVal;
    }
    else if (this.isFullHouse(player, table)) {
      let fHVal = this.isFullHouse(player, table);
      return fHVal;
    }
    else if (this.isFlush(player,table)) {
      let flushVal = this.isFlush(player, table);
      return flushVal;
    }
    else if (this.isStraight(player, table)) {
      let straightVal = this.isStraight(player,table);
      return straightVal;
    }
    else if (this.isTrip(player, table)) {
        let tripVal = this.isTrip(player, table);
        return tripVal;
    }
    else if (this.isTwoPair(player, table)) {
      let pairVal = this.isTwoPair(player, table);
      return pairVal;
    }
    else if (this.isPair(player, table)){
        let pairVal = this.isPair(player, table);
        return pairVal;
    }
    return RANKS.highCard;
  }
  //takes in an array of players as input
  //returns the winning player
  getWinner(players) {
      return players[0];
  }
  findDuplicate(arr) {
      let duplicates = {};
      let largestDuplicate = false;
    
      for (let i = 0; i < arr.length; i++) {
        if (duplicates[arr[i]] !== undefined) {
          duplicates[arr[i]]++;
        } else {
          duplicates[arr[i]] = 1;
        }
      }
    
      for (let key in duplicates) {
        if (duplicates[key] > 1) {
          if (largestDuplicate === false || key > largestDuplicate) {
            largestDuplicate = key;
          }
        }
      }
    
      if (largestDuplicate === false) {
        return false;
      } else {
        return parseInt(largestDuplicate);
      }
  }
  findTwoPair(arr) {
    let pairs = {};
    let highestPair = false;
  
    for (let i = 0; i < arr.length; i++) {
      if (pairs[arr[i]] !== undefined) {
        pairs[arr[i]]++;
      } else {
        pairs[arr[i]] = 1;
      }
    }
  
    let numPairs = 0;
  
    for (let key in pairs) {
      if (pairs[key] >= 2) {
        numPairs++;
  
        if (highestPair === false || key > highestPair) {
          highestPair = key;
        }
      }
    }
  
    if (numPairs >= 2) {
      console.log("TWOPAIR");
      return parseInt(highestPair);
    } else {
      return false;
    }
  }
  findTriplets(arr) {
      let triplets = {};
      let largestTriplet = false;
    
      for (let i = 0; i < arr.length; i++) {
        if (triplets[arr[i]] !== undefined) {
          triplets[arr[i]]++;
        } else {
          triplets[arr[i]] = 1;
        }
      }
    
      for (let key in triplets) {
        if (triplets[key] >= 3) {
          if (largestTriplet === false || key > largestTriplet) {
            largestTriplet = key;
          }
        }
      }
    
      if (largestTriplet === false) {
        return false;
      } else {
        return parseInt(largestTriplet);
      }
  }
  findStraight(arr) {
    let l = 0;
    let r = 0;
    let max = 0;
    arr.sort();
    while (r < arr.length - 1) {
        if (arr[r] +1 === arr[r+1]) {
            r += 1;
        }
        else if (arr[r] == arr[r+1]) {
            l += 1;
            r += 1;
        }
        else {
            l = r;
            r += 1;
        }
        let distance = r - l + 1
        max = Math.max(distance, max);
        if (max >= 5) {
            var highCard = arr[r];
        }
    }
    if (max >= 5) {
        return highCard;
    }
    return false

  }
  findFlush(arr) {
    let stringCounts = {};

    for (let i = 0; i < arr.length; i++) {
      if (stringCounts[arr[i]] !== undefined) {
        stringCounts[arr[i]]++;
      } else {
        stringCounts[arr[i]] = 1;
      }
      
      if (stringCounts[arr[i]] === 5) {
        return arr[i];
      }
    }
  
    return false;
  }
  findFullHouse(arr) {
    let valueCounts = {};
    let topSet = null;
    let secondSet = null;
  
    // Count the number of occurrences of each value in the array
    for (let i = 0; i < arr.length; i++) {
      if (valueCounts[arr[i]] !== undefined) {
        valueCounts[arr[i]]++;
      } else {
        valueCounts[arr[i]] = 1;
      }
    }
  
    // Check if there is a three of a kind and a two of a kind
    for (let value in valueCounts) {
      if (valueCounts[value] === 3) {
        topSet = parseInt(value);
      } else if (valueCounts[value] === 2) {
        secondSet = parseInt(value);
      }
    }
  
    // If both a three of a kind and a two of a kind were found, return the top set value
    if (topSet !== null && secondSet !== null) {
      return topSet;
    } else {
      return false;
    }
  }
  findQuads(arr) {
    let valueCounts = {};

    // Count the number of occurrences of each value in the array
    for (let i = 0; i < arr.length; i++) {
      if (valueCounts[arr[i]] !== undefined) {
        valueCounts[arr[i]]++;
      } else {
        valueCounts[arr[i]] = 1;
      }
    }
  
    // Check if there is a four of a kind
    for (let value in valueCounts) {
      if (valueCounts[value] === 4) {
        return parseInt(value);
      }
    }
  
    // If no four of a kind was found, return false
    return false;
  }
  findStraightFlush(arr) {

  }
  findRoyalFlush(arr) {

  }

  isPair(player, table) {
      let tableValues = this.getTableValues(player, table);
      if (this.findDuplicate(tableValues)) {
          let pair = RANKS.pair;
          pair.high = this.findDuplicate(tableValues);
          return pair;
      }
      return false;
  }
  isTwoPair(player, table) {
    let tableValues = this.getTableValues(player, table);
    if (this.findTwoPair(tableValues)) {
        let tpair = RANKS.twoPair;
        tpair.high = this.findTwoPair(tableValues);
        return tpair;
    }
    return false;
  }
  isTrip(player, table) {
      let tableValues = this.getTableValues(player, table);
      if (this.findTriplets(tableValues)) {
          let trip = RANKS.trips;
          trip.high = this.findTriplets(tableValues);
          return trip;
      }
      return false;
  }
  isStraight(player, table) {
    let tableValues = this.getTableValues(player, table);
    if (this.findStraight(tableValues)) {
        let s = RANKS.straight;
        s.high = this.findStraight(tableValues);
        return s;
    }
    return false;
  }
  isFlush(player, table) {
    let tableSuits = this.getTableSuits(player, table);
    if (this.findFlush(tableSuits)) {
      let f = RANKS.flush;
      f.high = this.findFlush(tableSuits);
      return f;
    }
    return false;
  }
  isFullHouse(player, table) {
    let tableValues = this.getTableValues(player, table);
    if (this.findFullHouse(tableValues)) {
      let fH = RANKS.fullHouse;
      fH.high = this.findFullHouse(tableValues);
      return fH;
    }
  }
  isQuads(player, table) {
    let tableValues = this.getTableValues(player, table);
    if (this.findQuads(tableValues)) {
      let q = RANKS.quads;
      q.high = this.findQuads(tableValues);
      return q;
    }
  }

  getTableValues(player, table) {
      let tableValues = [];
      table.forEach(card => {
          tableValues.push(card.getValue());
      });
      let c1Value = player.hand.card1.getValue();
      let c2Value = player.hand.card2.getValue();
      tableValues.push(c1Value);
      tableValues.push(c2Value);

      console.log(tableValues);

      return tableValues;
  }
  getTableSuits(player, table) {
    let tableSuits = [];
    table.forEach(card => {
      tableSuits.push(card.getSuit())
    });
    let c1Suit = player.hand.card1.getSuit();
    let c2Suit = player.hand.card2.getSuit();
    tableSuits.push(c1Suit);
    tableSuits.push(c2Suit);

    return tableSuits;
  }
}

let SUITS = ["clubs", "diamonds", "hearts", "spades"];

let VALUES = ["2","3","4","5","6","7","8","9","10","jack","queen","king","ace"];




let p1 = new player.Player("p1");

let c1 = new Card(SUITS[1], VALUES[4]);
let c2 = new Card(SUITS[2], VALUES[5]);

let hand = new player.Hand(c1, c2);

p1.updateHand(hand);

let table = [];

let c3 = new Card(SUITS[2], VALUES[4]);
table.push(c3);
let c4 = new Card(SUITS[3], VALUES[5]);
table.push(c4);
let c5 = new Card(SUITS[0], VALUES[8]);
table.push(c5);


let ranking = new Ranking();



// function testing() {
//     p1.printHand();
//     console.log(p1.hand.card1.getValue());
//     console.log(p1.hand.card1.getSuit());
//     console.log(p1.hand.card2.getValue());
//     console.log(p1.hand.card2.getSuit());
// }

function testing() {
    console.log(ranking.getRanking(p1, table));
}



testing();






module.exports = Ranking;