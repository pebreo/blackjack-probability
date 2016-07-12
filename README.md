
# Permutations in Javascript

http://stackoverflow.com/questions/9960908/permutations-in-javascript

# http://pebreo.github.io/blackjack-probability

Development Setup
----------------

Step 1. Install node package manager (npm) by going to `https://nodejs.org/` and click INSTALL

Step 2. Check that `npm` is installed:

```bash
npm -v
```

Step 3. Install gulp

```bash
npm install -g gulp

```

Step 4. Install requirements

```bash
cd myproject
npm install # this will create node_modules/ subdirectory in your directory
```

Step 5. Run gulp:
```bash
gulp # this will run flask and open a browser
```


Black Jack Rules
---------------
```
Setup: Remove Joker and shuffle playing card deck.
Then deal 2 cards face up to player(s) and 1 card face up and card facedown for dealer.

Card values:
Numerical cards are worth their face value.
Face cards are worth 10 points.
The Ace is worth 1 or 11.

Player moves:
The players go first, they can either: hit or stand. If they get > 21 they bust.
Players hit until they want to stand.

Dealer move:
After the player stands, the dealer reveals his/her second card.
Standard house rules says if dealer has value of <= 16 then they must hit.

After dealer moves, whoever has the closest 

If both players have 21, they both tie.
```
