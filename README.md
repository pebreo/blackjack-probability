
# BlackJack Probabilities

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


How does the program work?
---------------------------

* Initialize the data in MyCtrl
* When user clicks 'Deal' button call `first_deal()`

* `first_deal()` calls:
   - myservice.make_deck()
   - myservice.setup_static_deck()
   - myservice.blackjack_deal($scope.current_deck)
   - $scope.show_info_tables()
   - returns nothing

* When user clicks 'Hit' button call `deal_to_player()`

* `deal_to_player()` calls:
   - obj = myservice.deal_card($scope.current_deck)
   - myservice.player_hand(obj.card)
   - $scope.show_info_tables()
   - $scope.check_bust(myservice.player_hand)

* When user clicks `Stand` button call `player_stand()`

* `player_stand()` calls `$scope.dealer_move()` which calls:
   - myservice.dealer_hand[1].show = true
   -

* `decide_winner()` calls:
    - myservice.decide_winne(player_hand, dealer_hand)
    - use switch statement to display the appropriate message


Combinations data methods
-------------------------

* `$scope.show_info_tables()` calls:
    - probService.getComboData()
       - returns result
       - set: $scope.combos_data_rows = result.combos_count
       - use loop to decide weather to hit or stand (should probably put in a service)
    - $scope.decide_winner()

* `probService.getComboData()` calls:
     - myservice.setup_static_deck()
     - hand_value = myservice.calc_hand_value(myservice.player_hand)
     - desired_hand_value = 21 - hand_value[0]
     - avail_deck = transform.get_available_cards(myservice.static_deck, myservice.player_hand, myservice.dealer_hand)
     - return myservice.get_prob_stats(myservice.player_hand, avail_deck)

* render in `prob_table.html` template using the following variables:
    - $scope.combos_data_totals = result
    - combos_data_totals.total_combos
    - combos_data_totals.desired_cards_count
    - combos_data_totals.total_prob

    - row data: $scope.combos_data_rows
        - c.k  - key
        - c.total_combos
        - c.desired_cards_count
        - c.fraction


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
