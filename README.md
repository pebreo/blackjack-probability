
# Permutations in Javascript

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

Known Issues / To Do
--------------------
```
todo: I need to display when the player wins or loses.

1) The app does not currently allow splitting hands. For example, if you have 2 Aces,
you can split them into two hands and place bets independently.

2) The app does not allow you to place bets. There is a whole set of rules
to place bets. The originally purpose of this game was to show simple probabilities
of drawing cards from a deck. Adding bets would be a bonus but it is not urgent.

3) In calculating the combinations of cards need to reach 21, I limited k = 1,2,3, or 4.
The reason I limit k to a maximum of 4 is because it takes to long to calculate
anything past k=4. 

The k value is from the formula n choose k, where k is the number of slots. So
if I have 52 cards to choose from I would have k=2 slots : 52 choose 2.

When k=5, the superset of combinations, i.e. the sum of (52 choose 1) 
+ (52 choose 2) + (52 choose 3) + (52 choose 4) is about 1.9 million combinations -
so it kind of hangs the app. A possibility solution would be to use angular promises
so that I can prevent the UI from freezing by rendering the cards and when the calculation
is finished then it will draw it when the calculation is done.



```
