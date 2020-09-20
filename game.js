//var Player = require('../player.js');

var player1 = new Player('Elle',player1Cards);
var player2 = new Player('Isabel',player2Cards);

class Game {
  constructor(player1,player2) {
    this.player1 = player1.name;
    this.player2 = player2.name;
    this.cards = fullDeck;  
  }

getRandomIndex(player) {
  var cardsArray = player.hand;
  return Math.floor(Math.random() * cardsArray.length);
}

shuffle(player) {
  var newHand = [];
  for (var i = 0; i< 26; i++ ) {
    var randomNum = this.getRandomIndex(player);
    var randomCard = player.hand[randomNum]
    newHand.push(randomCard);
    player.hand.splice(randomNum,1);
  }
  return player.hand = newHand;
}

}
// var game = new Game(player1,player2)
// console.log(player1.hand);
// game.shuffle(player1);
// console.log(player1.hand);



