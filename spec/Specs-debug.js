

xdescribe("calc_hand_value", function() {
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

    xit("combs_choose - desired_value is NaN ", function() {

        var hand =  stub_data.make_hand([ ['k','clubs'], ['7','hearts'] ]);
        var deck = stub_data.static_deck;

        hand_value = myservice.calc_hand_value(hand);
        var desired_hand_value = 21 - hand_value[1];
        expect(isNaN(desired_hand_value)).toEqual(true);

    });  

    // use issue # 2 cards
    it("issue2 - combs_choose - deck.length 52 - desired_hand_value<15 k=1,2,3 ", function() {

        var hand =  stub_data.make_hand([ ['4','clubs'], ['q','spades'] ]);
        var deck = stub_data.static_deck;

        hand_value = myservice.calc_hand_value(hand);
        var desired_hand_value = 21 - hand_value[0];
        console.log('desired hand value ' + desired_hand_value);
        var card_combos = myservice.make_card_combos(deck, desired_hand_value);
        // (52 choose 1) + (52 choose 2) + (52 choose 3)
        expect(card_combos.length).toEqual(23478);

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

    it("issue2 cards - combs_choose - deck.length 52 - desired_hand_value>=16 k=1,2,3,4 ", function() {

        var hand =  stub_data.make_hand([ ['4','clubs'], ['q','spades'] ]);
        var deck = stub_data.static_deck;

        hand_value = myservice.calc_hand_value(hand);
        var desired_hand_value = 21 - hand_value[0];
        console.log('desired hand value ' + desired_hand_value);
        var card_combos = myservice.make_card_combos(deck, desired_hand_value);
        // (52 choose 1) + (52 choose 2) + (52 choose 3) + (52 choose 4)
        expect(card_combos.length).toEqual(23478);

    });
});

xdescribe("make_combos_with_hand_values", function() {
    var myservice, transform, math, stub_data;
    // setup the angular module
    beforeEach(module('myApp'));

    // setup the service
    beforeEach(inject(function(_myservice_, _transform_, _math_, _stub_data_, _serviceDebug_) {
        myservice = _myservice_;
        transform = _transform_;
        math = _math_;
        stub_data = _stub_data_;
        serviceDebug = _serviceDebug_;
    }));

  
    xit("good test - make_combos_with_hand_values", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var hand =  stub_data.make_hand([ ['k','diams'], ['8','spades'] ]);
        var deck = stub_data.static_deck;

        hand_value = myservice.calc_hand_value(hand);
        var desired_hand_value = 21 - hand_value[0];
        console.log('desired hand value ' + desired_hand_value);
        var card_combos = myservice.make_card_combos(deck, desired_hand_value);
        var combo_vals =  myservice.make_combos_with_hand_values(card_combos);
        obj = combo_vals[desired_hand_value];
        // ISSUE: not enough cards when k=2
        // console.log(JSON.stringify(obj));
        // (52 choose 1) + (52 choose 2) + (52 choose 3) + (52 choose 4)
        expect(card_combos.length).toEqual(23478);

    });
    
    /*
        make_combos_with_hand_values => 
          make_perms_with_hand_values

          -> make_hand_values
    */

    xit("make_hand_values - ", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var hand =  stub_data.make_hand([ ['k','diams'], ['8','spades'] ]);
        var deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(hand);
        var desired_hand_value = 21 - hand_value[0];
        console.log('desired hand value ' + desired_hand_value);
        var card_combos = myservice.make_card_combos(deck, desired_hand_value);
        var combo_vals =  myservice.make_combos_with_hand_values(card_combos);
        obj = combo_vals[desired_hand_value];
        console.log(obj);
        // var hand_values = [];
        // _.each(card_combos, function (combo) {
        //     hand_values.push(combo);            
        // });
        // console.log(hand_values.length);
        
        //# check line 161 - perms_with_values[]


    });

     it("good test myservice.make_hand_values - myservice.make_combos_with_hand_values", function() {
            /*
                3 - all suits
                2 (all suits) + A (all suits)
                A (clubs,diams,hearts) + A(diams, hearts, spades)
                A (all suits)
            */
            var hand =  stub_data.make_hand([ ['k','diams'], ['8','spades'] ]);
            var deck = stub_data.static_deck;
            hand_value = myservice.calc_hand_value(hand);
            var desired_hand_value = 21 - hand_value[0];
            console.log('desired hand value ' + desired_hand_value);


            var card_combos = myservice.make_card_combos(deck, desired_hand_value);
            var combo_vals =  myservice.make_combos_with_hand_values(card_combos);
            desired_values = combo_vals[desired_hand_value];
            expect(desired_values.length).toEqual(24);
         


        });       

    it("good test - make_hand_values - make_combos_with_hand_values", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var hand =  stub_data.make_hand([ ['k','diams'], ['8','spades'] ]);
        var deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(hand);
        var desired_hand_value = 21 - hand_value[0];
        console.log('desired hand value ' + desired_hand_value);


        var card_combos = serviceDebug.make_card_combos(deck, desired_hand_value);
        var combo_vals =  serviceDebug.make_combos_with_hand_values(card_combos);
        desired_values = combo_vals[desired_hand_value];
        expect(desired_values.length).toEqual(24);
        
        // console.log(serviceDebug.problem_cards);
        /*
        i get 23478 which is the correct sum

        but i expect to have 28 items for combo_vals['3']

        i know that groupBy() on linke 125 is fine
        because i manually get the items that have value of 3
        and it is only 24

        make_hand_value(hand) each hand 


        card_combo aka hand
        [
          {
            "id": 22,
            "rank": "9",
            "rank_integer": [
              9
            ],
            "suit": "diams",
            "show": true
          },
          {
            "id": 49,
            "rank": "10",
            "rank_integer": [
              10
            ],
            "suit": "spades",
            "show": true
          }
        ]
        */


    });   

    it("make_hand_values -2 ", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var hand =  stub_data.make_hand([ ['a','diams'], ['2','clubs'] ]);
        hv = serviceDebug.make_hand_values(hand);      
        console.log(JSON.stringify(hv));

         var hand =  stub_data.make_hand([ ['2','clubs'], ['a','diams'] ]);
        hv = serviceDebug.make_hand_values(hand);      
        console.log(JSON.stringify(hv));

         var hand =  stub_data.make_hand([ ['2','clubs'], ['a','diams'] ]);
        hv = serviceDebug.make_hand_values(hand);      
        console.log(JSON.stringify(hv));        

         var hand =  stub_data.make_hand([ ['2','clubs'], ['a','diams'] ]);
        hv = serviceDebug.make_hand_values(hand);      
        console.log(JSON.stringify(hv));

    });     

});




xdescribe("make_dh_grouped", function() {
    var myservice, transform, math, stub_data;
    // setup the angular module
    beforeEach(module('myApp'));

    // setup the service
    beforeEach(inject(function(_myservice_, _transform_, _math_, _stub_data_, _serviceDebug_) {
        myservice = _myservice_;
        transform = _transform_;
        math = _math_;
        stub_data = _stub_data_;
        serviceDebug = _serviceDebug_;
    }));

       

    xit("good test - get_needed_ranks", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var player_hand =  stub_data.make_hand([ ['k','diams'], ['8','spades'] ]);
        var static_deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(player_hand);
        var desired_hand_value = 21 - hand_value[0];

        desired_values = myservice.get_needed_ranks(player_hand, static_deck)
        expect(desired_values.length).toEqual(24);
        

    });   
    xit("make_dh_grouped", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var player_hand =  stub_data.make_hand([ ['k','diams'], ['8','spades'] ]);
        var static_deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(player_hand);
        var desired_hand_value = 21 - hand_value[0];

        desired_values = myservice.get_needed_ranks(player_hand, static_deck)
        var three_dv = _.groupBy(desired_values, function(item){
            return item.hand.length;
        });      
        // console.log(JSON.stringify(three_dv[3]));

        // var dh_grouped_3 =transform.make_dh_grouped(three_dv[3]);
        // console.log(JSON.stringify(dh_grouped));

        // crashes
        // var x = transform.make_suits_group_string_arr(dh_grouped_3);

        var dh_grouped =transform.make_dh_grouped(desired_values);
        //console.log(JSON.stringify(Object.keys(dh_grouped)));

        // i think i have to rewrite these calculations entirely!
        // var x = transform.make_suits_group_string_arr(dh_grouped);

    });      

     xit("good stub - get_prob_stats", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var player_hand =  stub_data.make_hand([ ['k','diams'], ['8','spades'] ]);
        var dealer_hand =  stub_data.make_hand([ ['j','diams'], ['9','diams'] ]);
         dealer_hand[1].show = false;
         var static_deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(player_hand);
        var desired_hand_value = 21 - hand_value[0];
        var avail_deck = transform.get_available_cards(static_deck, player_hand, dealer_hand);
         console.log(avail_deck.length);
        var x = myservice.get_prob_stats(player_hand, avail_deck);
        console.log(x.combos_count);
         console.log(x.totals_count);

    });



     xit("good test - get_prob_stats", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var player_hand =  stub_data.make_hand([ ['j','spades'], ['10','hearts'] ]);
        var dealer_hand =  stub_data.make_hand([ ['3','hearts'], ['9','spades'] ]);
         dealer_hand[1].show = false;
         var static_deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(player_hand);
        var desired_hand_value = 21 - hand_value[0];
        var avail_deck = transform.get_available_cards(static_deck, player_hand, dealer_hand);
         console.log(avail_deck.length);
        var x = myservice.get_prob_stats(player_hand, avail_deck);
        expect(x.combos_count.length).toEqual(3);

    });

    it("get_prob_stats", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        var player_hand =  stub_data.make_hand([ ['a','spades'], ['7','spades'] ]);
        var dealer_hand =  stub_data.make_hand([ ['8','hearts'], ['3','hearts'] ]);
        dealer_hand[1].show = false;
         var static_deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(player_hand);
        var desired_hand_value = 21 - hand_value[0];
        var avail_deck = transform.get_available_cards(static_deck, player_hand, dealer_hand);
         console.log(avail_deck.length);
        var x = myservice.get_prob_stats(player_hand, avail_deck);
        expect(x.combos_count.length).toEqual(3);

    });

});



describe("make_dh_grouped", function() {
    var myservice, transform, math, stub_data;
    // setup the angular module
    beforeEach(module('myApp'));

    // setup the service
    beforeEach(inject(function(_myservice_, _transform_, _math_, _stub_data_, _serviceDebug_) {
        myservice = _myservice_;
        transform = _transform_;
        math = _math_;
        stub_data = _stub_data_;
        serviceDebug = _serviceDebug_;
    }));



    xit("good program execution - group_hand_group_into_slots", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        myservice.setup_static_deck();
        var player_hand =  stub_data.make_hand([ ['k','diams'], ['8','spades'] ]);
        //var player_hand =  stub_data.make_hand([ ['k','diams'], ['a','spades'] ]);
        var static_deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(player_hand);
        var desired_hand_value = 21 - hand_value[0];

        desired_hands = myservice.get_needed_ranks(player_hand, static_deck);

        var x = transform.group_needed_ranks_into_hand_length(desired_hands);
        //hand_size = Object.keys(x)[0] - the hand size is the hand length, which is the same as the key
        var slot_obj = transform.group_hand_group_into_slots(x[3], 3);
        var z = transform.transform_to_add_suits_and_ids(slot_obj);

    });


    xit("good program execution -  transform_to_add_suits_and_ids", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        myservice.setup_static_deck();
        var player_hand =  stub_data.make_hand([ ['k','diams'], ['8','spades'] ]);
        //var player_hand =  stub_data.make_hand([ ['k','diams'], ['a','spades'] ]);
        var static_deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(player_hand);
        var desired_hand_value = 21 - hand_value[0];

        desired_hands = myservice.get_needed_ranks(player_hand, static_deck);

        var x = transform.group_needed_ranks_into_hand_length(desired_hands);
        //hand_size = Object.keys(x)[0] - the hand size is the hand length, which is the same as the key
        var slot_obj = transform.group_hand_group_into_slots(x[2], 1);
        var given_hand_length_slots1 = transform.transform_to_add_suits_and_ids(slot_obj);

        var slot_obj = transform.group_hand_group_into_slots(x[2], 2);
        var given_hand_length_slots2 = transform.transform_to_add_suits_and_ids(slot_obj);

        var slot_obj = transform.group_hand_group_into_slots(x[2], 3);
        var given_hand_length_slots3 = transform.transform_to_add_suits_and_ids(slot_obj);

    });

    it("good program execution -  transform_to_add_suits_and_ids", function() {
        /*
            3 - all suits
            2 (all suits) + A (all suits)
            A (clubs,diams,hearts) + A(diams, hearts, spades)
            A (all suits)
        */
        myservice.setup_static_deck();
        var player_hand =  stub_data.make_hand([ ['k','diams'], ['8','spades'] ]);
        //var player_hand =  stub_data.make_hand([ ['k','diams'], ['a','spades'] ]);
        var static_deck = stub_data.static_deck;
        hand_value = myservice.calc_hand_value(player_hand);
        var desired_hand_value = 21 - hand_value[0];

        desired_hands = myservice.get_needed_ranks(player_hand, static_deck);

        var x = transform.group_needed_ranks_into_hand_length(desired_hands);
        //hand_size = Object.keys(x)[0] - the hand size is the hand length, which is the same as the key


        var slot_obj = transform.group_hand_group_into_slots(x[2], 3);
        var given_hand_length_slots3 = transform.transform_to_add_suits_and_ids(slot_obj);

    });

});
