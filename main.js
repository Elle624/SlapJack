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

function startGame() {
  playersDealHand();
  slapCards();
}

function updateCentralDeck(player) {
  var centralDeck = document.querySelector('.central-pile');
  var playerColor;
  playerColor = 
  player.name === game.player1.name ? '#74b9ff' : '#ffeaa7'
  centralDeck.setAttribute("style", `background-image : url(${game.centralPile[0].name}); box-shadow: 0em 0em 2em 1em ${playerColor}`)
  centralDeck.classList.remove('hidden');
}

function updatePlayerDeck(players) {
  var decks = document.querySelectorAll('.card');
  for (var i = 0; i < players.length; i++) {
    if (players[i].player.hand.length === 0) {
      decks[players[i].decksIndex].classList.add('hidden');
      game.dealMultipleCards(players[i]);
    } else {
      decks[players[i].decksIndex].classList.remove('hidden');
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
  var classElement = centralDeck.classList;
  var players = [
    {turn: 1, keyValue:'q', player: game.player1, decksIndex: 0},
    {turn: 2, keyValue:'p', player: game.player2, decksIndex: 2}
  ];
  resolvePlayerSlap(keyValue, classElement, player, players);
}

function resolvePlayerSlap(keyValue, element, player, players) {
  if (event.key === keyValue) {
    game.slap(player);
    updatePlayerDeck(players)
    scores[0].innerText = `${game.player1.wins} Wins`;
    scores[1].innerText = `${game.player2.wins} Wins`;
  }
  if (event.key === keyValue && game.centralPile.length > 0) {
    element.remove('hidden');
  } else if (event.key === keyValue) {
    element.add('hidden');
  }
}

function slapCards() {
  checkPlayerSlap('f', game.player1);
  checkPlayerSlap('j', game.player2);
}

displayDecks();