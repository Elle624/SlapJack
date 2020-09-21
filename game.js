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

  getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  dealDeckOut(player1, player2) {
    player1.hand = this.fullDeck.slice(0,26);
    player2.hand = this.fullDeck.slice(26);
  }
  
  shuffle(player) {
    var shuffledCards = [];
    var cards = player ? player.hand : this.fullDeck;
    var arrayLength = cards.length;
    for (var i = 0; i< arrayLength; i++ ) {
      var randomNum = this.getRandomIndex(cards);
      var randomCard = cards[randomNum];
      shuffledCards.push(randomCard);
      cards.splice(randomNum, 1);
    }
    player? player.hand = shuffledCards : this.fullDeck = shuffledCards;
  }

  updateCentralPile(card) {
    this.centralPile.unshift(card);
  }

  checkPlayerTurn(player) {
    if (player.name === player1.name) {
      this.playerTurn = 2;
    } else {
      this.playerTurn = 1;
    }
  }

  dealACard(player) {
    var topCard = player.playCard();
    this.updateCentralPile(topCard);
    this.checkPlayerTurn(player);
  }

  reducePlayerHand(player) {
    if (player === player1) {
      player2.hand.push(player.hand[0]);
      player.hand.splice(0,1);
      this.checkPlayerTurn(player);
    } else {
      player1.hand.push(player.hand[0]);
      player.hand.splice(0,1);
      this.checkPlayerTurn(player);
    } 
  }

  updatePlayerHand(player) {
    player.hand = player.hand.concat(this.centralPile);
    this.centralPile = [];
    this.shuffle(player);
    this.checkPlayerTurn(player);
  }

  checkGoodSlap() {
    var top3Cards = this.centralPile.slice(0,3);
    return top3Cards[0].number === 'jack' || 
           top3Cards[0].number === top3Cards[1].number || 
           top3Cards[0].number === top3Cards[2].number
  }

  slap(player) {
    if (this.centralPile[0].number === 'jack' || this.centralPile[0].number === this.centralPile[1].number) {
      this.updatePlayerHand(player)
    } else if (this.centralPile.length<3 || !this.checkGoodSlap()) {
      this.reducePlayerHand(player)
    } else {
      this.updatePlayerHand(player)
    }
  }

  updateWins(player) {
    player.wins ++;
    this.centralPile = [];
    this.dealDeckOut(player1, player2);
  }

}










