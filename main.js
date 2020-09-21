var game = new Game(player1,player2);

var cardsPiles = document.querySelector('.game');

window.addEventListener('keyup', startGame);

function displayDecks() {
  game.shuffle();
  game.dealDeckOut(player1, player2);
  cardsPiles.innerHTML=
  `<div class="card player-one" style="background: url(assets/back.png) 0em -4em/16em no-repeat"></div>
  <div class="card central-pile hidden"></div>
  <div class="card player-two" style="background: url(assets/back.png) 0em -4em/16em no-repeat"></div>`
}

function startGame() {
  playersDealHand();
  slapCards();
}

function updateCentralDeck(player) {
  var decks = document.querySelectorAll('.card');
  var playerColor;
  playerColor = 
  player.name === player1.name ? '#74b9ff' : '#ffeaa7'
  decks[1].classList.remove('hidden');
  decks[1].innerHTML = 
  `<div class="card central-pile" style="background-image:url(${game.centralPile[0].name});box-shadow: 0em 0em 2em 1em ${playerColor}"></div>`
}

function updatePlayerDeck(player,index) {
  var decks = document.querySelectorAll('.card');
  if (player.hand.length === 0) {
    decks[index].classList.add('hidden');
  }
}
function takeTurnDealCards(players) {
   for (var i = 0; i < players.length; i++) {
    if (game.playerTurn === players[i].turn && event.key === players[i].keyValue) {
    game.dealACard(players[i].player);
    updateCentralDeck(players[i].player);
    updatePlayerDeck(players[i].player,players[i].decksIndex);
    }
  } 
}

function playersDealHand() {
  var players = [
    {turn: 1, keyValue:'q', player: player1, decksIndex: 0},
    {turn: 2, keyValue:'p', player: player2, decksIndex: 2}
  ];
  takeTurnDealCards(players);
    
}

function checkPlayerSlap(keyValue, player) {
  var decks = document.querySelectorAll('.card');
  var element = decks[1].classList;
  if (event.key === keyValue) {
    game.slap(player);
    game.centralPile.length>0? element.remove('hidden') : element.add('hidden')
  }
}

function slapCards() {
  checkPlayerSlap('f', player1);
  checkPlayerSlap('j', player2);
}

displayDecks();