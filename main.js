var game = new Game(player1,player2);

var cardsPiles = document.querySelector('.game');

window.addEventListener('keyup', playerDealHand);

function displayDecks() {
  game.dealDeckOut(player1, player2);
  game.shuffle(player1);
  game.shuffle(player2);
  cardsPiles.innerHTML=
  `<div class="card player-one" style="background: url(assets/back.png) 0em -4em/16em no-repeat">
  </div>
  <div class="card central-pile hidden"></div>
  <div class="card player-two" style="background: url(assets/back.png) 0em -4em/16em no-repeat">
  </div>`
}
function playerDealHand() {
  if (game.playerTurn === 1 && event.key === 'q') {
    game.dealACard(player1);
    updateCentralDeck(player1);
  } else if (game.playerTurn === 2 && event.key === 'p') {
    game.dealACard(player2);
    updateCentralDeck(player2);
  }
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

displayDecks();
