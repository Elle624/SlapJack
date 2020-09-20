//var Player = require('../player.js');

var player1 = new Player('Elle');
var player2 = new Player('Isabel');

class Game {
  constructor(player1,player2) {
    this.player1 = player1.name;
    this.player2 = player2.name;
    this.fullDeck = fullDeck;
    this.centralPile = [];
  }

  getRandomIndex(player) {
    var cardsArray = player.hand;
    return Math.floor(Math.random() * cardsArray.length);
  }

  dealDeckOut(player1,player2) {
    player1.hand = fullDeck.slice(0,26);
    player2.hand = fullDeck.slice(26);
  }
  
  shuffle(player) {
    var newHand = [];
    var arrayLength = player.hand.length;
    for (var i = 0; i< arrayLength; i++ ) {
      var randomNum = this.getRandomIndex(player);
      var randomCard = player.hand[randomNum];
      newHand.push(randomCard);
      player.hand.splice(randomNum,1);
    }
    player.hand = newHand;
  }

  updateCentralPile(card) {
    this.centralPile.unshift(card);
  }
  
}
//var game = new Game(player1,player2)








