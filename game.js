var player1 = new Player('Elle');
var player2 = new Player('Isabel');

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.fullDeck = fullDeck;
    this.centralPile = [];
    this.playerTurn = 1;
  }

  getRandomIndex(player) {
    var cardsArray = player.hand;
    return Math.floor(Math.random() * cardsArray.length);
  }

  dealDeckOut(player1, player2) {
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
      player.hand.splice(randomNum, 1);
    }
    player.hand = newHand;
  }

  updateCentralPile(card) {
    this.centralPile.unshift(card);
  }

  dealACard(player) {
    var topCard = player.playCard();
    this.updateCentralPile(topCard);
    if (player.name === player1.name) {
      this.playerTurn = 2;
    } else {
      this.playerTurn = 1;
    }
  }

  reducePlayerHand(player) {
    if (player === player1) {
      player2.hand.push(player.hand[0]);
      player.hand.splice(0,1);
    } else {
      player1.hand.push(player.hand[0]);
      player.hand.splice(0,1);
    } 
  }
  updatePlayerHand(player) {
    player.hand = player.hand.concat(this.centralPile);
    this.centralPile = [];
    this.shuffle(player);
  }

  checkGoodSlap() {
    var top3Cards = this.centralPile.slice(0,3);
    return top3Cards[0].number === 'jack' || 
           top3Cards[0].number === top3Cards[1].number || 
           top3Cards[0].number === top3Cards[2].numebr
  }

  slap(player) {
    if (this.centralPile.length<3 || !this.checkGoodSlap()) {
      return this.reducePlayerHand(player)
    } else {
      this.updatePlayerHand(player);
    } 
  }

  updateWins(player) {
    player.wins ++;
    this.centralPile = [];
    this.dealDeckOut(player1, player2);
  }

}










