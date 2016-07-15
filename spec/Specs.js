
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

        // this does not work with 52 values for some reason
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

     // this does not work with 52 values for some reason
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



describe("get_needed_ranks", function() {
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
        //console.log(combo_vals);
        expect(Object.keys(combo_vals).length).toEqual(2);

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
        expect(hand_value.length).toEqual(200);

    });

    // should handle when you can't get to 21 e.g. no more cards to get 2 or 3

    // should handle when you have aces by merging one array with another
    // e.g. c = Array.prototype.concat([], L1, L2)

    it("should calculate when there is an ace", function() {
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
        console.log(hand_values);
        expect(hand_values.length).toEqual(3);
    });



});