

describe("calc_hand_value", function() {
    var myservice, transform, math, stub_data;
    // setup the angular module
    beforeEach(module('myApp'));

    // setup the service
    beforeEach(inject(function(_myservice_, _transform_, _math_, _stub_data_) {
        myservice = _myservice_;
        transform = _transform_;
        math = _math_;
        stub_data = _stub_data_;
    }));

    it("calc_hand_value no ace", function() {

        var hand =  stub_data.make_hand([ ['7','clubs'], ['8','hearts'] ]);
        hand_value = myservice.calc_hand_value(hand);
        expect(hand_value).toEqual([15]);

    });

    it("calc_hand_value - with ace", function() {

        var hand =  stub_data.make_hand([ ['a','clubs'], ['8','hearts'] ]);
        hand_value = myservice.calc_hand_value(hand);
        expect(hand_value).toEqual([9,19]);

    });


    it("calc_hand_value - with ace", function() {

        var hand =  stub_data.make_hand([ ['a','clubs'], ['k','hearts'] ]);
        hand_value = myservice.calc_hand_value(hand);
        expect(hand_value).toEqual([11,21]);

        var hand =  stub_data.make_hand([ ['a','clubs'], ['j','hearts'] ]);
        hand_value = myservice.calc_hand_value(hand);
        expect(hand_value).toEqual([11,21]);

        var hand =  stub_data.make_hand([ ['a','clubs'], ['q','hearts'] ]);
        hand_value = myservice.calc_hand_value(hand);
        expect(hand_value).toEqual([11,21]);

        var hand =  stub_data.make_hand([ ['a','clubs'], ['a','hearts'] ]);
        hand_value = myservice.calc_hand_value(hand);
        expect(hand_value).toEqual([2,22]);                

    });



    xit("make_card_combos - no ace", function() {

        var hand =  stub_data.make_hand([ ['a','clubs'], ['k','hearts'] ]);
        var deck = stub_data.static_deck;

        hand_value = myservice.calc_hand_value(hand);
        var desired_hand_value = 21 - hand_value[0];
        console.log('desired hand value ' + desired_hand_value);
        var card_combos = myservice.make_card_combos(deck, desired_hand_value);

        expect(card_combos.length).toEqual(175);

    });

    it("combs_choose - deck.length 52 - desired_hand_value<15 k=1,2,3 ", function() {

        var hand =  stub_data.make_hand([ ['k','clubs'], ['7','hearts'] ]);
        var deck = stub_data.static_deck;

        hand_value = myservice.calc_hand_value(hand);
        var desired_hand_value = 21 - hand_value[0];
        console.log('desired hand value ' + desired_hand_value);
        var card_combos = myservice.make_card_combos(deck, desired_hand_value);
        // (52 choose 1) + (52 choose 2) + (52 choose 3)
        expect(card_combos.length).toEqual(23478);

    });


    it("combs_choose - desired_value is NaN ", function() {

        var hand =  stub_data.make_hand([ ['k','clubs'], ['7','hearts'] ]);
        var deck = stub_data.static_deck;

        hand_value = myservice.calc_hand_value(hand);
        var desired_hand_value = 21 - hand_value[1];
        expect(isNaN(desired_hand_value)).toEqual(true);

    });    

    it("combs_choose - deck.length 52 - desired_hand_value>=16 k=1,2,3,4 ", function() {

        var hand =  stub_data.make_hand([ ['2','clubs'], ['3','hearts'] ]);
        var deck = stub_data.static_deck;

        hand_value = myservice.calc_hand_value(hand);
        var desired_hand_value = 21 - hand_value[0];
        console.log('desired hand value ' + desired_hand_value);
        var card_combos = myservice.make_card_combos(deck, desired_hand_value);
        // (52 choose 1) + (52 choose 2) + (52 choose 3) + (52 choose 4)
        expect(card_combos.length).toEqual(294203);

    });



   





});




