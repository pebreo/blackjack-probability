
xdescribe("Deck functions", function() {
    var myservice;

    // setup the angular module
    beforeEach(module('myApp'));
    
    // setup the service 
    beforeEach(inject(function(_myservice_) {
        myservice = _myservice_;
    }));

    it("myservice.baz should be a certain string", function() {
        expect(myservice.baz).toBe('baz value!');
    });

    it("should handle integer ranks - ace,jack,queen, king", function() {
        expect(myservice.rank2integer('a')).toEqual([1,11]);
        expect(myservice.rank2integer('j')).toEqual([10]);
        expect(myservice.rank2integer('q')).toEqual([10]);
        expect(myservice.rank2integer('k')).toEqual([10]);
    });

    it("should handle integer ranks - 2 to 10", function(){
        expect(myservice.rank2integer('2')).toEqual([2]);
        expect(myservice.rank2integer('3')).toEqual([3]);
        expect(myservice.rank2integer('4')).toEqual([4]);
        expect(myservice.rank2integer('5')).toEqual([5]);
        expect(myservice.rank2integer('6')).toEqual([6]);
        expect(myservice.rank2integer('7')).toEqual([7]);
        expect(myservice.rank2integer('8')).toEqual([8]);
        expect(myservice.rank2integer('9')).toEqual([9]);
        expect(myservice.rank2integer('10')).toEqual([10]);
    });

    it("should return 52", function() {
        var deck = myservice.make_deck();
        expect(deck.length).toEqual(52);
    });


    it("should have 4 suits", function() {
        var deck = myservice.make_deck();
        var groups = _.groupBy(deck, function(a) {return a.suit});
        expect(Object.keys(groups).length).toEqual(4);
    });

    xit("should return 53 cards because one is a blank", function() {
        var deck = myservice.make_deck();
        expect(deck.length).toEqual(53);
    });

    xit("should have first card as blank", function() {
        //JSON.stringify()
        var deck = myservice.make_deck();
        first_card = deck[0];
        expect(JSON.stringify(first_card)).toEqual(JSON.stringify({id:0, rank:0, suit:'back'}));
    });

    xit("should have 5 suits because back has its own suit", function() {
        var deck = myservice.make_deck();
        var groups = _.groupBy(deck, function(a) {return a.suit});
        expect(Object.keys(groups).length).toEqual(5);
    });




});


xdescribe("Deal function", function() {
    var myservice;
    // setup the angular module
    beforeEach(module('myApp'));

    // setup the service
    beforeEach(inject(function(_myservice_) {
        myservice = _myservice_;
    }));

    it("should make the deck smaller", function() {
        var deck = myservice.make_deck();
        var card;
        // remove once
        expect(deck.length).toEqual(52);
        card = myservice.deal_card(deck, 1);
        expect(deck.length).toEqual(51);

        // remove again
        card = myservice.deal_card(deck, 1);
        expect(deck.length).toEqual(50);

    });

    it("should remove the card from the deck when dealt", function() {
        var deck = myservice.make_deck();
        var card;
        // remove once
        expect(deck.length).toEqual(52);
        card = myservice.deal_card(deck, 1);
        result = _.find(deck, function(c){return c.id == card.id});
        expect(result).toEqual(undefined);
    });

    it("should deal n cards", function() {
         var deck = myservice.make_deck();
        var card;
        // remove once
        expect(deck.length).toEqual(52);
        card = myservice.deal_card(deck, 1);

    });


    it("should have 48 cards after dealing to player and dealer", function() {
        var deck = myservice.make_deck();
        myservice.blackjack_deal(deck);
        // remove once
        expect(deck.length).toEqual(48);

    });



});


xdescribe("calc_hand_value", function() {
    var myservice;
    // setup the angular module
    beforeEach(module('myApp'));

    // setup the service
    beforeEach(inject(function(_myservice_) {
        myservice = _myservice_;
    }));

    it("should calculate when there is an ace card value", function() {
        var ace = {
            id: 1,
            rank: 1,
            rank_integer: [1,11],
            suit: 'clubs',
            show: true
        };
        var jack = {
            id: 11,
            rank: 11,
            rank_integer: [10],
            suit: 'clubs',
            show: true
        };

        var hand = [ace,jack];
        hand_value = myservice.calc_hand_value(hand);
        expect(hand_value).toEqual([11,21]);

    });

    it("should calculate when there is no ace", function() {
        var three = {
            id: 3,
            rank: 3,
            rank_integer: [3],
            suit: 'clubs',
            show: true
        };
        var jack = {
            id: 11,
            rank: 11,
            rank_integer: [10],
            suit: 'clubs',
            show: true
        };

        var hand = [three,jack];
        hand_value = myservice.calc_hand_value(hand);
        expect(hand_value).toEqual([13]);

    });





});






xdescribe("make_perms_with_hand_values", function() {
    var myservice;
    // setup the angular module
    beforeEach(module('myApp'));

    // setup the service
    beforeEach(inject(function(_myservice_) {
        myservice = _myservice_;
    }));

    it("should create static deck", function() {
        myservice.setup_static_deck();
        expect(myservice.static_deck.length).toEqual(52);
        ranks = Object.keys(_.groupBy(myservice.static_deck, function(card){return card.rank}));
        suits = Object.keys(_.groupBy(myservice.static_deck, function(card){return card.suit}));
        expect(ranks.length).toEqual(13);
        expect(suits.length).toEqual(4);

    });

    it("should return correct combinations length for 3 cards", function() {
        var three = {
            id: 3,
            rank: 3,
            rank_integer: [3],
            suit: 'clubs',
            show: true
        };
        var five = {
            id: 5,
            rank: 5,
            rank_integer: [5],
            suit: 'clubs',
            show: true
        };
        var jack = {
            id: 11,
            rank: 11,
            rank_integer: [10],
            suit: 'clubs',
            show: true
        };

        var deck = [three,five,jack];
        var card_perms = myservice.combs_choose(deck, 2);
        var perm_vals = myservice.make_perms_with_hand_values(card_perms);
        expect(Object.keys(perm_vals).length).toEqual(3);
    });

    it("should return correct hand values for 3, 5, and jack", function() {
        var three = {
            id: 3,
            rank: 3,
            rank_integer: [3],
            suit: 'clubs',
            show: true
        };
        var five = {
            id: 5,
            rank: 5,
            rank_integer: [5],
            suit: 'clubs',
            show: true
        };
        var jack = {
            id: 11,
            rank: 11,
            rank_integer: [10],
            suit: 'clubs',
            show: true
        };

        var deck = [three,five,jack];
        var card_perms = myservice.combs_choose(deck, 2);
        var combo_vals = myservice.make_perms_with_hand_values(card_perms);
        //console.log(perm_vals);
        expect(Object.keys(combo_vals)).toEqual(['8','13','15']);
    });


    it("should return correct hand values for two clubs, two of spades, five of clubs", function() {
        var two = {
            id: 2,
            rank: 2,
            rank_integer: [2],
            suit: 'clubs',
            show: true
        };
        var two_spades = {
            id: 2,
            rank: 2,
            rank_integer: [2],
            suit: 'spades',
            show: true
        };
        var five = {
            id: 5,
            rank: 5,
            rank_integer: [5],
            suit: 'clubs',
            show: true
        };


        var deck = [two,two_spades,five];
        var card_perms = myservice.combs_choose(deck, 2);
        var combo_vals = myservice.make_perms_with_hand_values(card_perms);
        //console.log(combo_vals);
        expect(Object.keys(combo_vals)).toEqual(['4','7']);
        expect(combo_vals['4'].length).toEqual(1);
        expect(combo_vals['7'].length).toEqual(2);
    });

    it("should return correct hand values for an ace and jack", function() {
        var ace = {
            id: 1,
            rank: 1,
            rank_integer: [1,11],
            suit: 'clubs',
            show: true
        };

       var jack = {
            id: 11,
            rank: 11,
            rank_integer: [10],
            suit: 'clubs',
            show: true
        };


        var deck = [ace,jack];
        var card_perms = myservice.combs_choose(deck, 2);
        var combo_vals = myservice.make_perms_with_hand_values(card_perms);
        expect(Object.keys(combo_vals)).toEqual(['11','21']);
    });

    it("should return correct hand values for an ace of clubs, ace of spades, and jack", function() {
        var ace = {
            id: 1,
            rank: 1,
            rank_integer: [1,11],
            suit: 'clubs',
            show: true
        };
        var ace_spades = {
            id: 43,
            rank: 1,
            rank_integer: [1,11],
            suit: 'spades',
            show: true
        };
       var jack = {
            id: 11,
            rank: 11,
            rank_integer: [10],
            suit: 'clubs',
            show: true
        };


        var deck = [ace,ace_spades,jack];
        var card_perms = myservice.combs_choose(deck, 2);
        //console.log(card_perms);
        var combo_vals = myservice.make_perms_with_hand_values(card_perms);
        expect(Object.keys(combo_vals)).toEqual(['2','11','21','22']);
    });

    it("should make combinations for a single suit deck", function(){
        var deck = [];

        var str2int = function (value) {
            if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
                return Number(value);
            return NaN;
        };
        var rank2integer = function (rank) {
            var rank_int = [];
            switch (rank) {
                case 'a':
                    rank_int.push(1);
                    rank_int.push(11);
                    break;
                case 'j':
                    rank_int.push(10);
                    break;
                case 'q':
                    rank_int.push(10);
                    break;
                case 'k':
                    rank_int.push(10);
                    break;
                default:
                    rank_int.push(str2int(rank));
            }
            return rank_int;

        };

        var setup_deck = function () {
            var suits = ['clubs'];
            var ranks = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
            var id = 1;

            // ever suit
            for (var i = 0; i < suits.length; i++) {
                // every value
                for (j = 0; j < ranks.length; j++) {
                    deck.push(
                        {
                            id: id,
                            rank: ranks[j],
                            rank_integer: rank2integer(ranks[j]),
                            suit: suits[i],
                            show: true
                        }
                    );
                    id += 1;
                }
            }
        };
        setup_deck();
        console.log(deck.length);
        var card_perms = myservice.combs_choose(deck, 2);
        var combo_vals = myservice.make_perms_with_hand_values(card_perms);

        expect(Object.keys(combo_vals).length).toEqual(19);

    });

    // this does not work with 52 values for some reason
    it("should handle 3 items to calculate", function(){
        //console.log('should handle 52 items to calculate');
        var items = [];
        var combos;
        for(var i=0;i<3;i++) {
            items.push(i + 1);
        }
        //console.log('items length' + items.length);
        combos = myservice.combs_choose(items, 2);
        expect(combos.length).toEqual(3);
    });

    
    it("should handle 10 items to calculate", function(){
        //console.log('should handle 52 items to calculate');
        var items = [];
        var combos;
        for(var i=0;i<10;i++) {
            items.push(i + 1);
        }
        //console.log(' 10 items length should be 10: ' + items.length);
        combos = myservice.combs_choose(items, 2);
        //console.log(combos.length);
        expect(combos.length).toEqual(45);
    });

     
    it("should handle 52 items, choose 2", function(){
        console.log('should handle 52 items to calculate');
        var items = [];
        var combos;
        for(var i=0;i<52;i++) {
            items.push(i + 1);
        }
        //console.log(' 52 items length should be: ' + items.length);
        combos = myservice.combs_choose(items, 2);
        expect(combos.length).toEqual(1326)
    });



    it("should make combinations for a full deck", function() {
      var two = {
                id: 2,
                rank: 2,
                rank_integer: [2],
                suit: 'clubs',
                show: true
      };
        var two_spades = {
            id: 2,
            rank: 2,
            rank_integer: [2],
            suit: 'spades',
            show: true
        };
        var five = {
            id: 5,
            rank: 5,
            rank_integer: [5],
            suit: 'clubs',
            show: true
        };


        var deck = [two,two_spades,five];
        myservice.setup_static_deck();
        console.log(myservice.static_deck.length + ' staticdeck length');
        var card_combos = myservice.combs_choose(myservice.static_deck, 2);
        var combo_vals = myservice.make_perms_with_hand_values(card_combos);

        expect(card_combos.length).toEqual(1326);
        expect(Object.keys(combo_vals)).toEqual(['2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22']);

    });


});



xdescribe("get_needed_ranks", function() {
    var myservice;
    // setup the angular module
    beforeEach(module('myApp'));

    // setup the service
    beforeEach(inject(function(_myservice_) {
        myservice = _myservice_;
    }));


    it("should return correct combinations of hand values", function(){
        var small_deck = [];
        var three = {
            id: 3,
            rank: 3,
            rank_integer: [3],
            suit: 'clubs',
            show: true
        };
        var jack = {
            id: 11,
            rank: 11,
            rank_integer: [10],
            suit: 'clubs',
            show: true
        };


        var str2int = function (value) {
            if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
                return Number(value);
            return NaN;
        };
        var rank2integer = function (rank) {
            var rank_int = [];
            switch (rank) {
                case 'a':
                    rank_int.push(1);
                    rank_int.push(11);
                    break;
                case 'j':
                    rank_int.push(10);
                    break;
                case 'q':
                    rank_int.push(10);
                    break;
                case 'k':
                    rank_int.push(10);
                    break;
                default:
                    rank_int.push(str2int(rank));
            }
            return rank_int;

        };

        var setup_deck = function () {
            var suits = ['clubs'];
            var ranks = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
            var id = 1;

            // ever suit
            for (var i = 0; i < suits.length; i++) {
                // every value
                for (j = 0; j < ranks.length; j++) {
                    small_deck.push(
                        {
                            id: id,
                            rank: ranks[j],
                            rank_integer: rank2integer(ranks[j]),
                            suit: suits[i],
                            show: true
                        }
                    );
                    id += 1;
                }
            }
        };


        setup_deck();

        var hand = [three,jack];

        //console.log(small_deck.length);
        var combo_vals = myservice.get_needed_ranks(hand, small_deck);
        //console.log(JSON.stringify(combo_vals));
        //console.log(combo_vals);
        expect(Object.keys(combo_vals).length).toEqual(6);

    });

    it("should calculate when there is no ace", function() {
        var three = {
            id: 3,
            rank: 3,
            rank_integer: [3],
            suit: 'clubs',
            show: true
        };
        var jack = {
            id: 11,
            rank: 11,
            rank_integer: [10],
            suit: 'clubs',
            show: true
        };

        var hand = [three,jack];
        myservice.setup_static_deck();
        hand_value = myservice.get_needed_ranks(hand);
        //console.log(hand_value.length);
        // console.log(JSON.stringify(hand_value));
        expect(hand_value.length).toEqual(258);

    });

    // should handle when you can't get to 21 e.g. no more cards to get 2 or 3

    // should handle when you have aces by merging one array with another
    // e.g. c = Array.prototype.concat([], L1, L2)

    it("should calculate when there is an ace - single suit deck", function() {
        var ace = {
            id: 1,
            rank: 1,
            rank_integer: [1,11],
            suit: 'clubs',
            show: true
        };
        var jack = {
            id: 11,
            rank: 11,
            rank_integer: [10],
            suit: 'clubs',
            show: true
        };
        var small_deck = [];

        var str2int = function (value) {
            if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
                return Number(value);
            return NaN;
        };
        var rank2integer = function (rank) {
            var rank_int = [];
            switch (rank) {
                case 'a':
                    rank_int.push(1);
                    rank_int.push(11);
                    break;
                case 'j':
                    rank_int.push(10);
                    break;
                case 'q':
                    rank_int.push(10);
                    break;
                case 'k':
                    rank_int.push(10);
                    break;
                default:
                    rank_int.push(str2int(rank));
            }
            return rank_int;

        };

        var setup_deck = function () {
            var suits = ['clubs'];
            var ranks = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
            var id = 1;

            // ever suit
            for (var i = 0; i < suits.length; i++) {
                // every value
                for (j = 0; j < ranks.length; j++) {
                    small_deck.push(
                        {
                            id: id,
                            rank: ranks[j],
                            rank_integer: rank2integer(ranks[j]),
                            suit: suits[i],
                            show: true
                        }
                    );
                    id += 1;
                }
            }
        };


        setup_deck();


        var hand = [ace,jack];
        var hand_values = myservice.get_needed_ranks(hand, small_deck);
        // console.log(JSON.stringify(hand_values));
        expect(hand_values.length).toEqual(12);
    });

    it("should calculate when there is an ace - two suit deck", function() {
        var ace = {
            id: 1,
            rank: 1,
            rank_integer: [1,11],
            suit: 'clubs',
            show: true
        };
        var jack = {
            id: 11,
            rank: 11,
            rank_integer: [10],
            suit: 'clubs',
            show: true
        };
        var small_deck = [];

        var str2int = function (value) {
            if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
                return Number(value);
            return NaN;
        };
        var rank2integer = function (rank) {
            var rank_int = [];
            switch (rank) {
                case 'a':
                    rank_int.push(1);
                    rank_int.push(11);
                    break;
                case 'j':
                    rank_int.push(10);
                    break;
                case 'q':
                    rank_int.push(10);
                    break;
                case 'k':
                    rank_int.push(10);
                    break;
                default:
                    rank_int.push(str2int(rank));
            }
            return rank_int;

        };

        var setup_deck = function () {
            var suits = ['clubs','diams'];
            var ranks = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
            var id = 1;

            // ever suit
            for (var i = 0; i < suits.length; i++) {
                // every value
                for (j = 0; j < ranks.length; j++) {
                    small_deck.push(
                        {
                            id: id,
                            rank: ranks[j],
                            rank_integer: rank2integer(ranks[j]),
                            suit: suits[i],
                            show: true
                        }
                    );
                    id += 1;
                }
            }
        };


        setup_deck();


        var hand = [ace,jack];
        var hand_values = myservice.get_needed_ranks(hand, small_deck);
        // console.log(JSON.stringify(hand_values));
        expect(hand_values.length).toEqual(65);
    });

    it("should return concatenated card combos when hand value is > 6", function(){
        var mock_deck = [];
        for(var i=0;i<10;i++) { mock_deck.push(i+1);}
        var hand_value = 7;
        var desired_hand_value = 21 - hand_value;
        var card_combos = myservice.make_card_combos(mock_deck, desired_hand_value);
        // should have 
        // 10choose1 + 10choose2 + 10choose3 = 175
        expect(card_combos.length).toEqual(175);

    });

    it("should return concatenated card combos when hand value is 6", function(){
        var mock_deck = [];
        for(var i=0;i<10;i++) { mock_deck.push(i+1);}
        var hand_value = 6;
        var desired_hand_value = 21 - hand_value;
        var card_combos = myservice.make_card_combos(mock_deck, desired_hand_value);
        // should have 
        // 10choose1 + 10choose2 + 10choose3 + 10choose4 = 385
        expect(card_combos.length).toEqual(385);


    });

    // not valid tests, i think
    xit("should work for a 4 = 2 + 2 hand value", function(){
        /*
        if i have a 2 + 2 then i have a 4. then i need a 17 which whould be a 10 + 7
        or a 2 + 2 + 3 + j 

        that means i have to calculate the maximum number of low cards that i think are in the deck.
        so basically things that are not in shown in my hand and not shown in the dealers hand.

        */
        expect(true).toEqual(false);
    });

    // not valid tests, i think
    xit("should calculate the max number of hits", function(){
        /*

        if i have the lowest possible hand which is a 

        what about an ace + ace which is a 2 (1+1) or 12 (11+1) 

        if i have a 3+3 then the longest path to 21 is to get the different 21 - 6 = 15

        so that would be :
        2+2+3+3+5  - i'd have to check if any of these numbers are shown (this.

        so i have to do: combos_choose(deck, 2)
        and: combos_choose(deck, 5)

        if i have a (2+2) = 4 then the logest distance is 21 - 4 = 17
        2+2+3+3+3+3  

        --
        the reason i need this information is because
        add more card_combos like this:
        var card_combos = [];
        for i in range(max_hits):
                // 49 choose 5
                card_combos = Array.prototype.concat(card_combos,myservice.combs_choose(myservice.static_deck, i+1));
                var combo_vals = myservice.make_perms_with_hand_values(card_combos);

        
        Honestly, i don't think it will get this far because of the dealers moves.

        */
    });

    xit("should have the data structure to display the probabilities", function(){
        /*

            [
            { rank_str: "1,2"
              hands : [
              {
               description:"2 of (hearts,diams)",
               probability: "1/3"
              },
              {
                description: "3 of (diams)",
                probability: "2/3"
              }
              ]
              total_probability: "2/9"
            }
            ]
        */
        
    });


});


describe("Transform functions", function() {
    var transform;
    var myservice;

    // setup the angular module
    beforeEach(module('myApp'));

    // setup the service
    beforeEach(inject(function(_transform_, _myservice_) {
        transform = _transform_;
        myservice = _myservice_;
    }));

    it("should return a string with desired attributes", function() {
        test_desired_cards = [
            {
            "hand_value": 10,
            "hand": [
              {
                "id": 10,
                "rank": "10",
                "rank_integer": [
                  10
                ],
                "suit": "clubs",
                "show": true
              }
            ]
            },
            {
            "hand_value": 10,
            "hand": [
              {
                "id": 15,
                "rank": "2",
                "rank_integer": [
                  2
                ],
                "suit": "diams",
                "show": true
              },
              {
                "id": 21,
                "rank": "8",
                "rank_integer": [
                  8
                ],
                "suit": "diams",
                "show": true
                }
                ]
            },
                        {
            "hand_value": 10,
            "hand": [
              {
                "id": 15,
                "rank": "2",
                "rank_integer": [
                  2
                ],
                "suit": "clubs",
                "show": true
              },
              {
                "id": 21,
                "rank": "8",
                "rank_integer": [
                  8
                ],
                "suit": "spades",
                "show": true
                }
                ]
            }

        ];

        expected_data = [
                          {
                            "hand_value": "10",
                            "rank_str": "10",
                            "rank_str_html": "[10 of (&clubs;)]",
                            "prob_text": "1\/3 = 1\/3"
                          },
                          {
                            "hand_value": "2,8",
                            "rank_str": "2,8",
                            "rank_str_html": "[2 of (&diams; or &clubs;)] and [8 of (&diams; or &spades;)]",
                            "prob_text": "1\/3 * 1\/3 * 1\/3 * 1\/3 = 1\/81"
                          }
                        ];

        var dh_grouped = transform.make_dh_grouped(test_desired_cards);
        var ans = transform.make_suits_group_string_arr(dh_grouped);
        // console.log(JSON.stringify(ans));
        expect(JSON.stringify(ans)).toEqual(JSON.stringify(expected_data));

    });


  it("is_in_it should work", function() {
        var ace = {
            id: 1,
            rank: 1,
            rank_integer: [1,11],
            suit: 'clubs',
            show: false
        };
        var ace_spades = {
            id: 43,
            rank: 1,
            rank_integer: [1,11],
            suit: 'spades',
            show: true
        };
       var jack = {
            id: 11,
            rank: 11,
            rank_integer: [10],
            suit: 'clubs',
            show: true
        };
        var jack_spades = {
            id: 31,
            rank: 11,
            rank_integer: [10],
            suit: 'spades',
            show: true
        };

        myservice.setup_static_deck();
        myservice.dealer_hand = [ace,jack];
        myservice.player_hand = [ace_spades,jack_spades] 
        
        // id 1
        var isavailable = transform.is_in_deck(1, myservice.static_deck);
        expect(isavailable).toEqual(true);

        // id 43 - should not be available because it is shown
        var isavailable = transform.is_in_deck(43, myservice.static_deck);
        expect(isavailable).toEqual(false);

        // id 11 - should not be available because it is shown
        var isavailable = transform.is_in_deck(11, myservice.static_deck);
        expect(isavailable).toEqual(false);

        // id 31 - - should not be available because it is shown
        var isavailable = transform.is_in_deck(31, myservice.static_deck);
        expect(isavailable).toEqual(false);

    });


  it("make_dh_grouped should work", function() {
        test_desired_cards = [
            {
            "hand_value": 10,
            "hand": [
              {
                "id": 10,
                "rank": "10",
                "rank_integer": [
                  10
                ],
                "suit": "clubs",
                "show": true
              }
            ]
            },
            {
            "hand_value": 10,
            "hand": [
              {
                "id": 15,
                "rank": "2",
                "rank_integer": [
                  2
                ],
                "suit": "diams",
                "show": true
              },
              {
                "id": 21,
                "rank": "8",
                "rank_integer": [
                  8
                ],
                "suit": "diams",
                "show": true
                }
                ]
            },
                        {
            "hand_value": 10,
            "hand": [
              {
                "id": 16,
                "rank": "2",
                "rank_integer": [
                  2
                ],
                "suit": "clubs",
                "show": true
              },
              {
                "id": 33,
                "rank": "8",
                "rank_integer": [
                  8
                ],
                "suit": "spades",
                "show": true
                }
                ]
            }

        ];

        expected_data = [
                          {
                            "hand_value": "10",
                            "rank_str": "10",
                            "rank_str_html": "[10 of (&clubs;)]",
                            "prob_text": "1\/3 = 1\/3"
                          },
                          {
                            "hand_value": "2,8",
                            "rank_str": "2,8",
                            "rank_str_html": "[2 of (&diams; or &clubs;)] and [8 of (&diams; or &spades;)]",
                            "prob_text": "1\/3 * 1\/3 * 1\/3 * 1\/3 = 1\/81"
                          }
                        ];

        var dh_grouped = transform.make_dh_grouped(test_desired_cards);
        var ans = transform.make_suits_group_string_arr(dh_grouped);
        // console.log(JSON.stringify(ans));
        expect(JSON.stringify(ans)).toEqual(JSON.stringify(expected_data));

    });

    it("transform_step2 should work", function() {
        var ace = {
            id: 13,
            rank: 1,
            rank_integer: [1,11],
            suit: 'clubs',
            show: false
        };
        var ace_spades = {
            id: 43,
            rank: 1,
            rank_integer: [1,11],
            suit: 'spades',
            show: true
        };
       var jack = {
            id: 11,
            rank: 11,
            rank_integer: [10],
            suit: 'clubs',
            show: true
        };
        var jack_spades = {
            id: 31,
            rank: 11,
            rank_integer: [10],
            suit: 'spades',
            show: true
        };
        var test_rs_pair1 = {"2":[{"rank":"2","suit":"diams","probability":["1","3"],"hand_value":10,"card_id":15},{"rank":"2","suit":"clubs","probability":["1","3"],"hand_value":10,"card_id":16}],"8":[{"rank":"8","suit":"diams","probability":["1","3"],"hand_value":10,"card_id":21},{"rank":"8","suit":"spades","probability":["1","3"],"hand_value":10,"card_id":33}]}
        var expected_data = [{"rank":"2","suits":["diams","clubs"],"probs":[["1","3"],["1","3"]],"prob_numerator":2,"card_ids":[15,16]},{"rank":"8","suits":["diams","spades"],"probs":[["1","3"],["1","3"]],"prob_numerator":2,"card_ids":[21,33]}];
        myservice.setup_static_deck();
        var player_hand = [ace,jack];
        var dealer_hand = [ace_spades,jack_spades] 
        
        var rs_pair3 = transform.transform_step2(test_rs_pair1, myservice.static_deck, player_hand, dealer_hand);
        expect(JSON.stringify(rs_pair3)).toEqual(JSON.stringify(expected_data));

    });
    
    it("transform_step3 should work", function() {
        var ace = {
            id: 13,
            rank: 1,
            rank_integer: [1,11],
            suit: 'clubs',
            show: false
        };
        var ace_spades = {
            id: 43,
            rank: 1,
            rank_integer: [1,11],
            suit: 'spades',
            show: true
        };
       var jack = {
            id: 11,
            rank: 11,
            rank_integer: [10],
            suit: 'clubs',
            show: true
        };
        var jack_spades = {
            id: 31,
            rank: 11,
            rank_integer: [10],
            suit: 'spades',
            show: true
        };
        var test_rs_pair2 = [{"rank":"2","suits":["diams","clubs"],"probs":[["1","3"],["1","3"]],"prob_numerator":2,"card_ids":[15,16]},{"rank":"8","suits":["diams","spades"],"probs":[["1","3"],["1","3"]],"prob_numerator":2,"card_ids":[21,33]}];
        var expected_data = [{"rank_string":"[2 of (&diams; or &clubs;)]","probability_string":"1/58","prob":[["1","3"],["1","3"]],"prob_numerator":2},{"rank_string":"[8 of (&diams; or &spades;)]","probability_string":"1/58","prob":[["1","3"],["1","3"]],"prob_numerator":2}];
        myservice.setup_static_deck();
        var player_hand = [ace,jack];
        var dealer_hand = [ace_spades,jack_spades] 
        
        var rs_pair3 = transform.transform_step3(test_rs_pair2, myservice.static_deck, player_hand, dealer_hand);
        expect(JSON.stringify(rs_pair3)).toEqual(JSON.stringify(expected_data));
        // expect(false).toEqual(true);

    });
        





});