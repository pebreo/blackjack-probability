
describe("get_prob_stats", function() {
    var myservice, transform, math, stub_data, stats;
    // setup the angular module
    beforeEach(module('myApp'));

    // setup the service
    beforeEach(inject(function(_myservice_, _transform_, _math_, _stub_data_, _serviceDebug_, _stats_) {
        myservice = _myservice_;
        transform = _transform_;
        math = _math_;
        stub_data = _stub_data_;
        serviceDebug = _serviceDebug_;
        stats = _stats_;
    }));

    it("should run King + 8", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var player_hand =  stub_data.make_hand([ ['k','spades'], ['8','hearts'] ]);
        var dealer_hand =  stub_data.make_hand([ ['8','hearts'], ['3','hearts'] ]);
        dealer_hand[1].show = false;
         var static_deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(player_hand);
        var desired_hand_value = 21 - hand_value[0];
        var avail_deck = transform.get_available_cards(static_deck, player_hand, dealer_hand);
         console.log(avail_deck.length);
        var result = stats.get_prob_stats(player_hand, avail_deck);
        console.log(result);
        expect(result.combos_count.length).toEqual(3);

    });

    xit("should not crash when run Ace + Ace", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var player_hand =  stub_data.make_hand([ ['a','diams'], ['a','spades'] ]);
        var dealer_hand =  stub_data.make_hand([ ['i','hearts'], ['3','hearts'] ]);
        dealer_hand[1].show = false;
         var static_deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(player_hand);
        var desired_hand_value = 21 - hand_value[0];
        var avail_deck = transform.get_available_cards(static_deck, player_hand, dealer_hand);
         console.log(avail_deck.length);
        var x = stats.get_prob_stats(player_hand, avail_deck);
        expect(x.combos_count.length).toEqual(3);

    });

    xit("should run Jack + Queen", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var player_hand =  stub_data.make_hand([ ['j','spades'], ['q','clubs'] ]);
        var dealer_hand =  stub_data.make_hand([ ['8','hearts'], ['3','hearts'] ]);
        dealer_hand[1].show = false;
         var static_deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(player_hand);
        var desired_hand_value = 21 - hand_value[0];
        var avail_deck = transform.get_available_cards(static_deck, player_hand, dealer_hand);
         console.log(avail_deck.length);
        var x = stats.get_prob_stats(player_hand, avail_deck);
        expect(x.combos_count.length).toEqual(3);

    });


    xit("should run 2 + 2", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var player_hand =  stub_data.make_hand([ ['2','spades'], ['2','diams'] ]);
        var dealer_hand =  stub_data.make_hand([ ['8','hearts'], ['3','hearts'] ]);
        dealer_hand[1].show = false;
         var static_deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(player_hand);
        var desired_hand_value = 21 - hand_value[0];
        var avail_deck = transform.get_available_cards(static_deck, player_hand, dealer_hand);
         console.log(avail_deck.length);
        var x = stats.get_prob_stats(player_hand, avail_deck);
        expect(x.combos_count.length).toEqual(3);

    });

    it(" get_prob_stats", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var player_hand =  stub_data.make_hand([ ['3','spades'], ['a','spades'] ]);
        var dealer_hand =  stub_data.make_hand([ ['8','hearts'], ['3','hearts'] ]);
        dealer_hand[1].show = false;
         var static_deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(player_hand);
        var desired_hand_value = 21 - hand_value[0];
        var avail_deck = transform.get_available_cards(static_deck, player_hand, dealer_hand);
         console.log(avail_deck.length);
        var x = stats.get_prob_stats(player_hand, avail_deck);
        expect(x.combos_count.length).toEqual(3);

    });

});
