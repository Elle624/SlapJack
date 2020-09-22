var game = new Game();
var message = document.querySelector('.message');
var cardsNumber = document.querySelectorAll('.display-cards-num p');
var scores = document.querySelectorAll('.score p');

window.addEventListener('keyup', startGame);

function displayDecks() {
  var cardsPiles = document.querySelector('.game');
  game.shuffle();
  game.dealDeckOut(game.player1);
  cardsNumber[0].innerText = `${game.player1.hand.length} cards`;
  cardsNumber[1].innerText = `${game.player2.hand.length} cards`;
  cardsPiles.innerHTML=
  `<div class="card player-one" style="background: url(assets/back.png) 0em -4em/16em no-repeat"></div>
  <div class="card central-pile hidden"></div>
  <div class="card player-two" style="background: url(assets/back.png) 0em -4em/16em no-repeat"></div>`
  scores[0].innerText = `${game.player1.wins} Wins`;
  scores[1].innerText = `${game.player2.wins} Wins`;
}

function manageClassProperty(propertyObject) {
  if (propertyObject.add === true) {
    propertyObject.element.classList.add('hidden');
  } else {
    propertyObject.element.classList.remove('hidden');
  }
}

function startGame() {
  playersDealHand();
  slapCards();
}

function updateCentralDeck(player) {
  var centralDeck = document.querySelector('.central-pile');
  var playerColor;
  playerColor = 
  player.name === game.player1.name ? '#74b9ff' : '#ffeaa7'
  centralDeck.setAttribute("style", `background-image : url(${game.centralPile[0].name}); box-shadow: 0em 0em 2em 1em ${playerColor}`);
  manageClassProperty({element:centralDeck});
}

function updatePlayerDeck() {
  cardsNumber[0].innerText = `${game.player1.hand.length} cards`;
  cardsNumber[1].innerText = `${game.player2.hand.length} cards`;
  var decks = document.querySelectorAll('.card');
  var players = [{player:game.player1, pileIndex: 0}, {player:game.player2, pileIndex: 2}]
  for (var i = 0; i < players.length; i++) {
    if (players[i].player.hand.length === 0) {
      manageClassProperty({element:decks[players[i].pileIndex], add: true});
      game.dealMultipleCards(players[i].player);
    } else {
      manageClassProperty({element:decks[players[i].pileIndex]});
    }
  }
}

function displayDealCards(keyValue, player, turn) {
  message.innerText = '';
  if (game.playerTurn === turn && event.key === keyValue) {
    game.dealACard(player);
    updateCentralDeck(player);
    updatePlayerDeck();
  }
}

function playersDealHand() {
  displayDealCards('q', game.player1, 1);
  displayDealCards('p', game.player2, 2);
}

function displaySlapMessage(player) {
  var slapMessage = game.checkGoodSlap();
  game.slap(player);
  if (game.centralPile <= 0 && slapMessage) {
    message.innerText = `${slapMessage}! ${game.updatePlayerHand(player)}`;
  } else if (game.centralPile <= 0 && !slapMessage) {
    message.innerText = `${game.endGame(player)}`;
  } else {
    message.innerText = `${game.reducePlayerHand(player)}`;
  }
}

function displayPlayerSlap(keyValue, player) {
  var centralDeck = document.querySelector('.central-pile');
  if (event.key === keyValue) {
   // game.slap(player)
    displaySlapMessage(player);
    updatePlayerDeck();
    scores[0].innerText = `${game.player1.wins} Wins`;
    scores[1].innerText = `${game.player2.wins} Wins`;
  }
  if (event.key === keyValue && game.centralPile.length > 0) {
    manageClassProperty({element:centralDeck});
  } else if (event.key === keyValue) {
    manageClassProperty({element:centralDeck, add: true});
  }
}

function checkPlayerSlap(keyValue, player) {
  var centralDeck = document.querySelector('.central-pile');
  displayPlayerSlap(keyValue, centralDeck, player);
}

function slapCards() {
  displayPlayerSlap('f', game.player1);
  displayPlayerSlap('j', game.player2);
}

displayDecks();