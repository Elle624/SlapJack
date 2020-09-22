class Game {
  constructor() {
    this.player1 = new Player('player1');
    this.player2 = new Player('player2');
    this.fullDeck = fullDeck;
    this.centralPile = [];
    this.playerTurn = 1;
  }

  getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  findOpponent(currentPlayer) {    
    return currentPlayer == this.player1 ? this.player2: this.player1;
  }

  dealDeckOut(player) {
    var otherPlayer = this.findOpponent(player);
    player.hand = this.fullDeck.slice(0,26);
    otherPlayer.hand = this.fullDeck.slice(26);
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
    if (player === this.player1) {
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
    var otherPlayer = this.findOpponent(player);
    otherPlayer.hand.push(player.hand[0]);
    player.hand.shift();
    this.checkPlayerTurn(player)
  }

  updatePlayerHand(player) {
    var otherPlayer = this.findOpponent(player);
    player.hand = player.hand.concat(this.centralPile);
    this.centralPile = [];
    this.shuffle(player);
    if (player.hand.length > 0 && otherPlayer.hand.length > 0) {
      this.checkPlayerTurn(player);
    }
  }

  checkGoodSlap() {
    var top3Cards = this.centralPile.slice(0,3);
    if (top3Cards[0] && top3Cards[0].number === 'jack') {
     return true;
    } else if (top3Cards[1] && top3Cards[0].number === top3Cards[1].number) {
      return true;
    } else if (top3Cards[2] && top3Cards[0].number === top3Cards[2].number) {
      return true;
    } 
  }

  slapJack(player) {
    var otherPlayer = this.findOpponent(player)
    if (otherPlayer.hand.length === 0) {
      this.updateWins(player);
    } else {
      this.updatePlayerHand(player);
    }
  }

  endGame(player) {
    var otherPlayer = this.findOpponent(player);
    if (player.hand.length === 0 && !this.checkGoodSlap()) {
    this.updateWins(otherPlayer)
    }
  }

  slap(player) {
    if (this.checkGoodSlap()) {
      this.slapJack(player)
    } else {
      this.reducePlayerHand(player);
    }
    this.endGame(player);
  }

  updateWins(player) {
    player.wins ++;
    player.saveWinsToStorage();
    this.centralPile = [];
    this.shuffle();
    this.dealDeckOut(player);
  }

  dealMultipleCards(player) {
    if (player.player === this.player1) {
      return this.playerTurn = 2;
    } else {
      return this.playerTurn = 1;
    }
  }
}










