/*

i have to clean dh_by_count, line 691

 */



xdescribe("make_dh_by_count_and_count_card_combos", function() {
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

    it("when ace + 9, should make unique combos count", function() {
        var hand = stub_data.make_hand([ ['a','diams'], ['9','hearts'] ]);
        var hand_value = stats.calc_hand_value(hand);
        var deck = stub_data.static_deck;
        var temp = stats.make_dh_by_count_and_count_card_combos(hand_value, deck);
        var dh_by_count = temp.dh_by_count;
        expect(dh_by_count["1"].length).toEqual(8);

    });


});

xdescribe("clean_dh_by_count_with_uniq_objects", function() {
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


    it("when ace + 9, should make unique combos count", function() {
        var hand = stub_data.make_hand([ ['a','diams'], ['9','hearts'] ]);
        var hand_value = stats.calc_hand_value(hand);
        var deck = stub_data.static_deck;
        var temp = stats.make_dh_by_count_and_count_card_combos(hand_value, deck);
        var dh_by_count = temp.dh_by_count;
        var new_dh_by_count = stats.clean_dh_by_count_with_uniq_objects(dh_by_count);
        expect(new_dh_by_count["1"].length).toEqual(8);

    });


});


xdescribe("make_and_reduce_combos_count", function() {
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


    it("exp: when ace + 9, should make unique combos count", function() {
        var hand = stub_data.make_hand([ ['a','diams'], ['9','hearts'] ]);
        var hand_value = stats.calc_hand_value(hand);
        var deck = stub_data.static_deck;

        var temp = stats.make_dh_by_count_and_count_card_combos(hand_value, deck);
        var count_card_combos = temp.count_card_combos;
        var dh_by_count = temp.dh_by_count;

        var combos_count = stats.make_and_reduce_combos_count(count_card_combos, dh_by_count);
        console.log(combos_count);

    });


});

xdescribe("make_total_count_obj", function() {
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


    it("exp: when ace + 9, should make unique combos count", function() {
        var hand = stub_data.make_hand([ ['a','diams'], ['9','hearts'] ]);
        var hand_value = stats.calc_hand_value(hand);
        var deck = stub_data.static_deck;

        var temp = stats.make_dh_by_count_and_count_card_combos(hand_value, deck);
        var count_card_combos = temp.count_card_combos;
        var dh_by_count = temp.dh_by_count;

        var combos_count = stats.make_and_reduce_combos_count(count_card_combos, dh_by_count);

        var total_count = stats.make_total_count_obj(combos_count);
    });


});


xdescribe("make_total_count_obj", function() {
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


    xit("when ace + 9, should make unique combos count", function() {
        test_combos_count = [{"k":1,"total_combos":49,"desired_cards_count":12,"fraction":[12,49]},{"k":2,"total_combos":1176,"desired_cards_count":208,"fraction":[26,147]},{"k":3,"total_combos":18424,"desired_cards_count":718,"fraction":[359,9212]},{"k":1,"total_combos":49,"desired_cards_count":12,"fraction":[12,49]},{"k":2,"total_combos":1176,"desired_cards_count":208,"fraction":[26,147]},{"k":3,"total_combos":18424,"desired_cards_count":718,"fraction":[359,9212]}];
        var total_count = stats.make_total_count_obj(test_combos_count);
        expect(total_count.desired_cards_count).toEqual(1876);
        expect(total_count.total_combos).toEqual(39298);
        expect(total_count.total_prob).toEqual('4.8% (134/2807)');

    });
    xit("exp", function() {
        test_combos_count = [{"k":1,"total_combos":49,"desired_cards_count":12,"fraction":[12,49]},{"k":2,"total_combos":1176,"desired_cards_count":208,"fraction":[26,147]},{"k":3,"total_combos":18424,"desired_cards_count":718,"fraction":[359,9212]},{"k":1,"total_combos":49,"desired_cards_count":12,"fraction":[12,49]},{"k":2,"total_combos":1176,"desired_cards_count":208,"fraction":[26,147]},{"k":3,"total_combos":18424,"desired_cards_count":718,"fraction":[359,9212]}];
        var total_count = stats.make_total_count_obj(test_combos_count);
        expect(total_count.desired_cards_count).toEqual(1876);
        expect(total_count.total_combos).toEqual(39298);
        expect(total_count.total_prob).toEqual('4.8% (134/2807)');

    });

});



describe("make_k_1_desired_card_string", function() {
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


    it("when ace + 9", function() {
        myservice.setup_static_deck();
        var dealer_hand =  stub_data.make_hand([ ['8','hearts'], ['3','hearts'] ]);
        dealer_hand[1].show = false;
        var player_hand = stub_data.make_hand([ ['a','diams'], ['9','hearts'] ]);
        myservice.player_hand = player_hand;
        myservice.dealer_hand = dealer_hand;

        var hand_value = stats.calc_hand_value(player_hand);
        var deck = stub_data.static_deck;

        var temp = stats.make_dh_by_count_and_count_card_combos(hand_value, deck);
        var count_card_combos = temp.count_card_combos;
        var dh_by_count = temp.dh_by_count;

        stats.make_k_1_desired_card_string(dh_by_count);

    });


});

describe("make_string_of_card_value", function() {
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


    it("when ace + 9", function() {
        cards = [{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true},{"id":27,"rank":"a","rank_integer":[1,11],"suit":"hearts","show":true},{"id":40,"rank":"a","rank_integer":[1,11],"suit":"spades","show":true},{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true},{"id":27,"rank":"a","rank_integer":[1,11],"suit":"hearts","show":true},{"id":40,"rank":"a","rank_integer":[1,11],"suit":"spades","show":true}];
        result = stats.make_string_of_card_value(cards);
        expected = 'A o f&clubs; - value(s): 1,11<br>A o f&diams; - value(s): 1,11<br>A o f&hearts; - value(s): 1,11<br>A o f&spades; - value(s): 1,11';
        expect(result).toEqual(expected)
    });


});

describe("make_string_of_cards_by_suit", function() {
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


    it("when ace + 9", function() {
        cards_by_suit = {"clubs":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":2,"rank":"2","rank_integer":[2],"suit":"clubs","show":true},{"id":3,"rank":"3","rank_integer":[3],"suit":"clubs","show":true},{"id":4,"rank":"4","rank_integer":[4],"suit":"clubs","show":true},{"id":5,"rank":"5","rank_integer":[5],"suit":"clubs","show":true},{"id":6,"rank":"6","rank_integer":[6],"suit":"clubs","show":true},{"id":7,"rank":"7","rank_integer":[7],"suit":"clubs","show":true},{"id":8,"rank":"8","rank_integer":[8],"suit":"clubs","show":true},{"id":9,"rank":"9","rank_integer":[9],"suit":"clubs","show":true},{"id":10,"rank":"10","rank_integer":[10],"suit":"clubs","show":true},{"id":11,"rank":"j","rank_integer":[10],"suit":"clubs","show":true},{"id":12,"rank":"q","rank_integer":[10],"suit":"clubs","show":true},{"id":13,"rank":"k","rank_integer":[10],"suit":"clubs","show":true}],"diams":[{"id":15,"rank":"2","rank_integer":[2],"suit":"diams","show":true},{"id":16,"rank":"3","rank_integer":[3],"suit":"diams","show":true},{"id":17,"rank":"4","rank_integer":[4],"suit":"diams","show":true},{"id":18,"rank":"5","rank_integer":[5],"suit":"diams","show":true},{"id":19,"rank":"6","rank_integer":[6],"suit":"diams","show":true},{"id":20,"rank":"7","rank_integer":[7],"suit":"diams","show":true},{"id":21,"rank":"8","rank_integer":[8],"suit":"diams","show":true},{"id":22,"rank":"9","rank_integer":[9],"suit":"diams","show":true},{"id":23,"rank":"10","rank_integer":[10],"suit":"diams","show":true},{"id":24,"rank":"j","rank_integer":[10],"suit":"diams","show":true},{"id":25,"rank":"q","rank_integer":[10],"suit":"diams","show":true},{"id":26,"rank":"k","rank_integer":[10],"suit":"diams","show":true}],"hearts":[{"id":27,"rank":"a","rank_integer":[1,11],"suit":"hearts","show":true},{"id":28,"rank":"2","rank_integer":[2],"suit":"hearts","show":true},{"id":29,"rank":"3","rank_integer":[3],"suit":"hearts","show":true},{"id":30,"rank":"4","rank_integer":[4],"suit":"hearts","show":true},{"id":31,"rank":"5","rank_integer":[5],"suit":"hearts","show":true},{"id":32,"rank":"6","rank_integer":[6],"suit":"hearts","show":true},{"id":33,"rank":"7","rank_integer":[7],"suit":"hearts","show":true},{"id":36,"rank":"10","rank_integer":[10],"suit":"hearts","show":true},{"id":37,"rank":"j","rank_integer":[10],"suit":"hearts","show":true},{"id":38,"rank":"q","rank_integer":[10],"suit":"hearts","show":true},{"id":39,"rank":"k","rank_integer":[10],"suit":"hearts","show":true}],"spades":[{"id":40,"rank":"a","rank_integer":[1,11],"suit":"spades","show":true},{"id":41,"rank":"2","rank_integer":[2],"suit":"spades","show":true},{"id":42,"rank":"3","rank_integer":[3],"suit":"spades","show":true},{"id":43,"rank":"4","rank_integer":[4],"suit":"spades","show":true},{"id":44,"rank":"5","rank_integer":[5],"suit":"spades","show":true},{"id":45,"rank":"6","rank_integer":[6],"suit":"spades","show":true},{"id":46,"rank":"7","rank_integer":[7],"suit":"spades","show":true},{"id":47,"rank":"8","rank_integer":[8],"suit":"spades","show":true},{"id":48,"rank":"9","rank_integer":[9],"suit":"spades","show":true},{"id":49,"rank":"10","rank_integer":[10],"suit":"spades","show":true},{"id":50,"rank":"j","rank_integer":[10],"suit":"spades","show":true},{"id":51,"rank":"q","rank_integer":[10],"suit":"spades","show":true},{"id":52,"rank":"k","rank_integer":[10],"suit":"spades","show":true}]};
        result = stats.make_string_of_cards_by_suit(cards_by_suit);
        expected = '&clubs;:A,2,3,4,5,6,7,8,9,10,J,Q,K<br>&diams;:2,3,4,5,6,7,8,9,10,J,Q,K<br>&hearts;:A,2,3,4,5,6,7,10,J,Q,K<br>&spades;:A,2,3,4,5,6,7,8,9,10,J,Q,K';
        expect(result).toEqual(expected)
    });


});

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
        //console.log(avail_deck.length);
        var result = stats.get_prob_stats(player_hand, avail_deck);
        expect(result.combos_count.length).toEqual(3);

    });

    it("should not crash when run Ace + Ace", function() {
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

    xit("should run Ace + 9", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var player_hand =  stub_data.make_hand([ ['a','diams'], ['9','spades'] ]);
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

    xit("should not crash when run Ace + Queen", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var player_hand =  stub_data.make_hand([ ['a','diams'], ['q','spades'] ]);
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

    it("exp: ace + 9", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var player_hand =  stub_data.make_hand([ ['a','diams'], ['9','spades'] ]);
        var dealer_hand =  stub_data.make_hand([ ['8','hearts'], ['3','hearts'] ]);
        dealer_hand[1].show = false;
         var static_deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(player_hand);
        var desired_hand_value = 21 - hand_value[0];
        var avail_deck = transform.get_available_cards(static_deck, player_hand, dealer_hand);
        var result = stats.get_prob_stats(player_hand, avail_deck);
    });

});


