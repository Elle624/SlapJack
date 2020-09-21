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

  dealDeckOut(player1, player2) {
    player1.hand = this.fullDeck.slice(0,6);
    player2.hand = this.fullDeck.slice(6,11);
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
    if (player === this.player1) {
      this.player2.hand.push(player.hand[0]);
      player.hand.splice(0,1);
      this.checkPlayerTurn(player);
    } else {
      this.player1.hand.push(player.hand[0]);
      player.hand.splice(0,1);
      this.checkPlayerTurn(player);
    } 
  }

  updatePlayerHand(player) {
    player.hand = player.hand.concat(this.centralPile);
    this.centralPile = [];
    this.shuffle(player);
    if (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
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

  slap(player) {
    if (this.checkGoodSlap()) {
      this.updatePlayerHand(player);
    } else {
      this.reducePlayerHand(player);
    }
    this.endGame(player);
  }

  endGame(player) {
    if (player === this.player1 && player.hand.length === 0 && !this.checkGoodSlap()) {
      console.log("end game")
      this.updateWins(this.player2)
    } else if (player === this.player1 && player.hand.length === 0 && this.slap(this.player2)) {
      console.log("end game")
      this.updateWins(this.player2)
    } else if (player === this.player2 && player.hand.length === 0 && !this.checkGoodSlap()) {
      console.log("end game")
      this.updateWins(this.player1)
    } else if (player === this.player2 && player.hand.length === 0 && this.slap(this.player1)) {
      console.log("end game")
      this.updateWins(this.player1)
    }
  }

  updateWins(player) {
    player.wins ++;
    this.centralPile = [];
    this.dealDeckOut(this.player1, this.player2);
  }

  dealMultipleCards(player) {
    if (player.player === this.player1) {
      return this.playerTurn = 2;
    } else {
      return this.playerTurn = 1;
    }
  }
}










