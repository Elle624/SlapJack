var game = new Game();
var cardsPiles = document.querySelector('.game');
var scores = document.querySelectorAll('p');

window.addEventListener('keyup', startGame);

function displayDecks() {
  game.shuffle();
  game.dealDeckOut(game.player1);
  cardsPiles.innerHTML=
  `<div class="card player-one" style="background: url(assets/back.png) 0em -4em/16em no-repeat"></div>
  <div class="card central-pile hidden"></div>
  <div class="card player-two" style="background: url(assets/back.png) 0em -4em/16em no-repeat"></div>`
  scores[0].innerText = `${game.player1.wins} Wins`;
  scores[1].innerText = `${game.player2.wins} Wins`;
}

function manageClassProperty(propertyObject) {
  if (propertyObject.add === true) {
    propertyObject.element.classList.add('hidden')
  } else {
    propertyObject.element.classList.remove('hidden')
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

function updatePlayerDeck(players) {
  var decks = document.querySelectorAll('.card');
  for (var i = 0; i < players.length; i++) {
    if (players[i].player.hand.length === 0) {
      manageClassProperty({element:decks[players[i].decksIndex], add: true});
      game.dealMultipleCards(players[i]);
    } else {
      manageClassProperty({element:decks[players[i].decksIndex]});
    }
  }
}

function displayDealCards(players) {
   for (var i = 0; i < players.length; i++) {
    if (game.playerTurn === players[i].turn && event.key === players[i].keyValue) {
      game.dealACard(players[i].player);
      updateCentralDeck(players[i].player);
      updatePlayerDeck(players);
    }
  } 
}

function playersDealHand() {
  var players = [
    {turn: 1, keyValue:'q', player: game.player1, decksIndex: 0},
    {turn: 2, keyValue:'p', player: game.player2, decksIndex: 2}
  ];
  displayDealCards(players);
}

function checkPlayerSlap(keyValue, player) {
  var centralDeck = document.querySelector('.central-pile')
  var players = [
    {turn: 1, keyValue:'q', player: game.player1, decksIndex: 0},
    {turn: 2, keyValue:'p', player: game.player2, decksIndex: 2}
  ];
  resolvePlayerSlap(keyValue, centralDeck, player, players);
}

function resolvePlayerSlap(keyValue, element, player, players) {
  if (event.key === keyValue) {
    game.slap(player);
    updatePlayerDeck(players)
    scores[0].innerText = `${game.player1.wins} Wins`;
    scores[1].innerText = `${game.player2.wins} Wins`;
  }
  if (event.key === keyValue && game.centralPile.length > 0) {
    manageClassProperty({element:element});
  } else if (event.key === keyValue) {
    manageClassProperty({element:element, add: true});
  }
}

function slapCards() {
  checkPlayerSlap('f', game.player1);
  checkPlayerSlap('j', game.player2);
}

displayDecks();