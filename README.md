# SlapJack (Solo Project)

## Credits
Elle Li: https://github.com/Elle624

### The link to my repo can be found here
https://github.com/Elle624/SlapJack

### The link to the project description can be found here
https://frontend.turing.io/projects/module-1/slapjack.html

## Project Overview
Welcome to Slapjack! This fun game requires two player to operate base on four different keys. q/f for player 1, and p/j for player 2. By pressing q or p, each player can deal a card and display in the middle pile. <br />
<br />
The rules:<br />
- Once a jack, double(two cards with same number/name), or sandwich(2 cards with same number/name, seperated by a third card in the middle) presents, players can slap by using f or j to slap it. The player slapped first will take the whole middle pile into their hands, and it will be shuffled before dealing again. If player 1 slapped but was not for any above mentioned situation, player 1 will lose the card on top of their hand to player 2. <br />
- When one player runs out of cards, the other player will continue dealing cards until a jack is presented, then both players can slap it. If the player without cards slapped it first, that player is now back into game. Otherwise, game end, the player with cards wins. <br />
<br />
The score is stored locally and will stay after reloading the page.

## Goals
My goal was to have more use of multiple classes interact and are associated with each other. Clean data model separated from DOM.

## Technologies
This game was built entirely from scratch using JavaScript, HTML, CSS, and chrome dev tools.

## Challenges
It was challenging to send correct slap messages depends on the situation. Simply beacuse the conditions are easily to cause bugs at delivery.

## Wins
Have a deeper understanding of class, data model and DOM behavior in a short time period.

## ScreenShots
![bad-slap](https://user-images.githubusercontent.com/68085997/93944295-a1cb6200-fcf1-11ea-8b21-f8e7c2756c97.gif)
![players-take-turn](https://user-images.githubusercontent.com/68085997/93944375-db9c6880-fcf1-11ea-9de7-e82cd0d176db.gif)
![sandwich](https://user-images.githubusercontent.com/68085997/93944381-ddfec280-fcf1-11ea-9cbb-9232072fed81.gif)
![jack-and-double](https://user-images.githubusercontent.com/68085997/93944614-71d08e80-fcf2-11ea-804c-a4a009aab0f4.gif)
![game-end](https://user-images.githubusercontent.com/68085997/93946747-51570300-fcf7-11ea-887c-8624749da84c.gif)
![reload-page](https://user-images.githubusercontent.com/68085997/93946750-5451f380-fcf7-11ea-95b1-f51abfdd4ed8.gif)
