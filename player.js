class Player {
  constructor(name) {
    this.name = name;
    this.id = Date.now();
    this.wins = JSON.parse(localStorage.getItem(`${this.name}Wins`)) || 0;
    this.hand = [];
  }
  playCard() {
    var topCard = this.hand[0];
    this.hand.splice(0,1);
    return topCard;
  }

  saveWinsToStorage() {
    localStorage.setItem(`${this.name}Wins`, this.wins)
  }
}
