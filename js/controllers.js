(function () {
    'use strict';

    var app = angular.module('myApp');

    app.controller('MyCtrl', [
        '$rootScope',
        '$scope',
        '$log',
        '$q',
        '$timeout',
        '$interval',
        'myservice',
        'transform',
        'math',
        'probService',
        'stub_data',
        'stats',
        function ($rootScope, $scope, $log, $q, $timeout, $interval, myservice, transform, math, probService, stub_data, stats) {
            // Scopes.store('MyCtrl', $scope); // a service to store $scope that other services can use
            var logic = myservice;
            logic.setup_static_deck();
            $scope.start_switch = false;
            $scope.current_deck = [];

            $scope.dealer_hand = [];
            $scope.player_hand = [];

            $scope.dealer_hand_value = [];
            $scope.player_hand_value = [];

            $scope.message = '';

            $scope.desired_cards_prob_html = [];
            $scope.desired_possible_hands = [];
            $scope.desired_cards_str_obj = {};
            $scope.show_needed_cards_table = false;
            $scope.show_prob_table = false;
            $scope.example_hands = {
              'ace_king': {name:"Ace of Spades + King of Hearts", player_hand:[['a', 'spades'], ['k', 'hearts']], dealer_hand:[['2', 'hearts'], ['2', 'spades']] },
              'ace_ace': {name:"Ace of Spades + Ace of Diamonds", player_hand:[['a', 'hearts'], ['a', 'diams']], dealer_hand:[['2', 'hearts'], ['2', 'spades']] },

            };
            $scope.is_end = function () {
                return true;
            };

            $scope.start_game = function () {
                $scope.reset_game();
                $scope.first_deal();
                $scope.start_switch = true;
            };

            $scope.reset_game = function () {
                $scope.message = '';
                $scope.start_switch = false;
                $scope.dealer_hand = [];
                $scope.player_hand = [];
                $scope.deck = [];
                $scope.desired_cards_prob_html = [];
                logic.logic_reset();

            };

            $scope.isBlank = function (rank) {
                if (rank == '0') {
                    return true
                }
                return false;
            };

            $scope.getPlayerHand = function () {
                return logic.player_hand;
            };

            $scope.getDealerHand = function () {
                return logic.dealer_hand;
            };


            $scope.first_deal_hide = function () {
                $scope.current_deck = logic.make_deck();
                logic.setup_static_deck();
                $scope.current_deck = logic.blackjack_deal($scope.current_deck);
                $scope.dealer_hand = [];
                $scope.dealer_hand = logic.dealer_hand;
                console.log('dealer hand');
                //console.log(logic.dealer_hand);

                $scope.dealer_hand_value = logic.calc_hand_value(logic.dealer_hand);

                //console.log($scope.dealer_hand_value);

                $scope.player_hand_value = logic.calc_hand_value(logic.player_hand);
                //console.log($scope.player_hand_value);
                var t0 = performance.now();
                probService.getData().then(function (result) {
                    $timeout(function () {
                        $scope.desired_cards_prob_html = result;
                    }, 0);

                    var t1 = performance.now();
                    console.log('duration ' + (t1 - t0));
                });

                console.log('below promise - this should go first');

            };

            $scope.set_example_hand = function(example_hand) {
                $scope.reset_game();
                console.log(example_hand);
                var stub_player_hand = example_hand.player_hand;
                var stub_dealer_hand = example_hand.dealer_hand;
                $scope.current_deck = logic.make_deck();
                logic.setup_static_deck();
                $scope.current_deck = logic.blackjack_deal($scope.current_deck);
                $scope.dealer_hand = [];
                $scope.dealer_hand = logic.dealer_hand;

                //console.log(logic.dealer_hand);

                //$scope.dealer_hand_value = logic.calc_hand_value(logic.dealer_hand);

                //$scope.player_hand_value = logic.calc_hand_value(logic.player_hand);

                $scope.stub_player_hand(stub_player_hand);

                $scope.show_info_tables();
                $scope.show_needed_cards_table = false;
                $scope.show_prob_table = false;
            };
            $scope.stub_player_hands_issue2 = function () {
                var s_dealer = stub_data.make_hand([['9', 'hearts'], ['a', 'spades']]);
                var s_player = stub_data.make_hand([['4', 'clubs'], ['q', 'spades']]);
                myservice.static_deck = stub_data.static_deck;

                s_dealer[1].show = false;
                myservice.dealer_hand = s_dealer;
                myservice.player_hand = s_player;

                $scope.player_hand = s_player;
                $scope.dealer_hand = s_dealer;

                $scope.current_deck = stub_data.make_modified_deck(s_player, s_dealer);
                console.log('stubbing deck');
                console.log($scope.current_deck);

            };

            $scope.stub_player_hands_issue1 = function () {
                var s_dealer = stub_data.make_hand([['5', 'clubs'], ['8', 'hearts']]);
                var s_player = stub_data.make_hand([['4', 'hearts'], ['a', 'clubs']]);
                myservice.static_deck = stub_data.static_deck;

                s_dealer[1].show = false;
                myservice.dealer_hand = s_dealer;
                myservice.player_hand = s_player;

                $scope.player_hand = s_player;
                $scope.dealer_hand = s_dealer;

                $scope.current_deck = stub_data.make_modified_deck(s_player, s_dealer);
                console.log('stubbing deck');
                console.log($scope.current_deck);

            };

            $scope.stub_player_hands_issue3 = function () {
                var s_dealer = stub_data.make_hand([['7', 'clubs'], ['8', 'hearts']]);
                var s_player = stub_data.make_hand([['2', 'diams'], ['2', 'hearts']]);
                myservice.static_deck = stub_data.static_deck;

                s_dealer[1].show = false;
                myservice.dealer_hand = s_dealer;
                myservice.player_hand = s_player;

                $scope.player_hand = s_player;
                $scope.dealer_hand = s_dealer;

                $scope.current_deck = stub_data.make_modified_deck(s_player, s_dealer);
                console.log('stubbing deck');
                console.log($scope.current_deck);

            };

            $scope.stub_player_hands_king_eight = function () {
                var s_dealer = stub_data.make_hand([['7', 'clubs'], ['8', 'hearts']]);
                var s_player = stub_data.make_hand([['k', 'diams'], ['8', 'spades']]);
                myservice.static_deck = stub_data.static_deck;

                s_dealer[1].show = false;
                myservice.dealer_hand = s_dealer;
                myservice.player_hand = s_player;

                $scope.player_hand = s_player;
                $scope.dealer_hand = s_dealer;

                $scope.current_deck = stub_data.make_modified_deck(s_player, s_dealer);
                console.log('stubbing deck');
                console.log($scope.current_deck);

            };


            $scope.stub_player_hand = function (player_hand) {
                var s_dealer = stub_data.make_hand([['4', 'clubs'], ['2', 'hearts']]);
                var s_player = stub_data.make_hand(player_hand);
                myservice.static_deck = stub_data.static_deck;

                s_dealer[1].show = false;
                myservice.dealer_hand = s_dealer;
                myservice.player_hand = s_player;

                $scope.player_hand = s_player;
                $scope.dealer_hand = s_dealer;

                $scope.current_deck = stub_data.make_modified_deck(s_player, s_dealer);
                console.log('stubbing deck');
                //console.log($scope.current_deck);

            };

            $scope.stub_player_hands_issue5 = function () {
                var s_dealer =  stub_data.make_hand([ ['8','hearts'], ['3','hearts'] ]);
                var s_player =  stub_data.make_hand([ ['a','spades'], ['7','spades'] ]);

                myservice.static_deck = stub_data.static_deck;

                s_dealer[1].show = false;
                myservice.dealer_hand = s_dealer;
                myservice.player_hand = s_player;

                $scope.player_hand = s_player;
                $scope.dealer_hand = s_dealer;

                $scope.current_deck = stub_data.make_modified_deck(s_player, s_dealer);
                console.log('stubbing deck');
                console.log($scope.current_deck);

            };

            $scope.show_info_tables = function () {
                // t0 = performance.now();
                //probService.getPossibleHandsData().then(function (result) {
                //    console.log(result);
                //    $scope.desired_possible_hands = result;
                //    $scope.show_needed_cards_table = true;
                //    // var t1 = performance.now();
                //    // console.log('duration ' + (t1-t0));
                //});


                probService.getComboData().then(function (result) {
                    $scope.combos_data_totals = result.totals_count;
                    $scope.combos_data_rows = result.combos_count;
                    $scope.desired_cards_str_obj = result.desired_cards_str_obj;
                    $scope.show_prob_table = true;
                });
            };

            $scope.first_deal = function () {
                $scope.current_deck = logic.make_deck();
                logic.setup_static_deck();
                $scope.current_deck = logic.blackjack_deal($scope.current_deck);
                $scope.dealer_hand = [];
                $scope.dealer_hand = logic.dealer_hand;
                console.log('dealer hand');
                //console.log(logic.dealer_hand);

                $scope.dealer_hand_value = logic.calc_hand_value(logic.dealer_hand);

                $scope.player_hand_value = logic.calc_hand_value(logic.player_hand);

                //$scope.stub_player_hand([['9', 'diams'], ['9', 'spades']]);

                $scope.show_info_tables();
                $scope.show_needed_cards_table = false;
                $scope.show_prob_table = false;

            };

            $scope.deal_to_player_hide = function () {
                var obj = logic.deal_card($scope.current_deck);
                $scope.current_deck = obj.deck;
                logic.player_hand.push(obj.card);
                $scope.check_bust(logic.player_hand);
            };

            $scope.deal_to_player = function () {
                var obj = logic.deal_card($scope.current_deck);
                $scope.current_deck = obj.deck;
                logic.player_hand.push(obj.card);

                $scope.show_info_tables();
                $scope.show_needed_cards_table = false;
                $scope.show_prob_table = false;

                $scope.check_bust(logic.player_hand);
            };

            $scope.player_stand = function () {
                //$scope.freeze_buttons();
                $scope.dealer_move();
                // turn off buttons

                // dealer makes move
                //$scope.dealer_move()
            };


            // $scope.dealer_move_experiment1 = function() {
            //     // unhide card
            //     logic.dealer_hand[1].show = true;
            //     $scope.dealer_hand = logic.dealer_hand;

            //     // decided to hit or stand
            //     var dealer_hand_value = _.min(logic.calc_hand_value($scope.dealer_hand));
            //     while (dealer_hand_value < 17) {
            //         var obj = {};
            //         animateService.anim().then(function(result){
            //             obj = result;
            //             console.log('after promise');
            //             console.log(obj);
            //              $scope.current_deck = obj.deck;
            //             logic.dealer_hand.push(obj.card);
            //             dealer_hand_value = _.min(logic.calc_hand_value($scope.dealer_hand));
            //         });

            //         $scope.dealer_hand = [];
            //         $scope.dealer_hand = logic.dealer_hand;

            //         console.log('deck size' + $scope.current_deck.length);
            //     };

            //     // decide winner
            //     $scope.decide_winner()
            // };

            // IDEA: you can use $watch to watch $scope.dealer_hand_value
            // and do $timeout.cancel(calculation)
            $scope.dealer_move_experiment2 = function () {
                // unhide card

                logic.dealer_hand[1].show = true;
                $scope.dealer_hand = logic.dealer_hand;
                var was_canceled = false;
                // decided to hit or stand
                var dealer_hand_value = _.min(logic.calc_hand_value($scope.dealer_hand));
                interval = $interval(function () {
                    if (dealer_hand_value >= 17) {
                        $interval.cancel(interval);
                    }
                    else {
                        var obj = logic.deal_card($scope.current_deck);
                        $scope.current_deck = obj.deck;
                        logic.dealer_hand.push(obj.card);
                        $scope.dealer_hand = [];
                        $scope.dealer_hand = logic.dealer_hand;
                        dealer_hand_value = _.min(logic.calc_hand_value($scope.dealer_hand));
                        console.log('deck size' + $scope.current_deck.length);
                    }
                    ;
                }, 1000, 30);

                // decide winner

            };

            $scope.dealer_move = function () {
                // unhide card
                logic.dealer_hand[1].show = true;
                $scope.dealer_hand = logic.dealer_hand;

                // decided to hit or stand
                var dealer_hand_value = _.min(logic.calc_hand_value($scope.dealer_hand));
                while (dealer_hand_value < 17) {
                    var obj = logic.deal_card($scope.current_deck);
                    $scope.current_deck = obj.deck;
                    logic.dealer_hand.push(obj.card);
                    $scope.dealer_hand = [];
                    $scope.dealer_hand = logic.dealer_hand;
                    dealer_hand_value = _.min(logic.calc_hand_value($scope.dealer_hand));
                    console.log('deck size' + $scope.current_deck.length);
                }
                ;

                // decide winner
                $scope.decide_winner()
            };

            $scope.check_bust = function (player_hand) {
                //console.log(logic.check_bust(logic.calc_hand_value(player_hand)));
                if (logic.check_bust(logic.calc_hand_value(player_hand)) === true) {
                    $scope.lose_message();
                }
            };

            $scope.check_dealer_bust = function (player_hand) {
                //console.log(logic.check_bust(logic.calc_hand_value(player_hand)));
                if (logic.check_bust(logic.calc_hand_value(player_hand)) === true) {
                    $scope.show_message('player_wins');
                }
            };

            $scope.decide_winner = function () {
                var outcome = logic.decide_winner(logic.player_hand, $scope.dealer_hand);
                switch (outcome) {
                    case "tie":
                        $scope.show_message('You both tie.');
                        $scope.freeze_buttons();
                        break;
                    case "player_win":
                        $scope.show_message('You win!');
                        $scope.freeze_buttons();
                        break;
                    case "dealer_win":
                        $scope.show_message('Dealer wins. Try again.');
                        $scope.freeze_buttons();
                        break;
                    default:
                        $scope.message = '';
                        break;
                }
            };

            $scope.decide_winner_old = function () {

                //var dh_value = _.min(logic.calc_hand_value($scope.dealer_hand));
                //var ph_value = _.min(logic.calc_hand_value(logic.player_hand));
                var dh_value = logic.get_best_hand_value(logic.calc_hand_value($scope.dealer_hand));
                var ph_value = logic.get_best_hand_value(logic.calc_hand_value(logic.player_hand));
                //if(dh_value === undefined) {
                //    console.log('undefined dh_value');
                //    console.log($scope.dealer_hand);
                //    console.log('calc hand value');
                //    console.log(logic.calc_hand_value($scope.dealer_hand));
                //}
                console.log('best hand dealer ' + dh_value);
                console.log('best hand player ' + ph_value);


                // check dealer bust
                if (dh_value > 21) {
                    console.log('dh value greater than 21');
                    $scope.show_message("player_win");
                    return;
                }
                ;
                // tie
                if (dh_value === ph_value) {
                    $scope.show_message("tie");
                } else if (dh_value <= 21) {
                    if (dh_value > ph_value) {
                        $scope.show_message("dealer_win");
                    }

                } else if (ph_value <= 21) {
                    if (ph_value > dh_value) {
                        $scope.show_message("player_win");
                    }
                }
                else {
                    $scope.show_message("tie");
                }
                ;
            };

            $scope.show_message = function (message) {
                $scope.message = message;
                $scope.freeze_buttons();
            };

            $scope.show_message_old = function (message) {
                console.log('the message' + message);
                switch (message) {
                    case "tie":
                        $scope.message = 'You both tie!';
                        $scope.freeze_buttons();
                        break;
                    case "player_win":
                        $scope.message = 'You win!';
                        $scope.freeze_buttons();
                        break;
                    case "dealer_win":
                        $scope.message = 'Dealer wins. Try again.';
                        $scope.freeze_buttons();
                        break;
                    default:
                        $scope.message = '';
                        break;
                }
            };

            $scope.lose_message = function () {
                $scope.message = 'You bust. Try again.';
                $scope.freeze_buttons();
                //$scope.reset_game();
            };

            $scope.freeze_buttons = function () {
                $scope.start_switch = false;
                $scope.show_needed_cards_table = false;
                $scope.show_prob_table = false;
            };

            // var end_listener = $scope.$watch('start_switch', function () {
            //     if ($scope.start_switch === true) {
            //         $scope.first_deal();
            //     }
            // });

            // // clear the watch because we are only using it one time
            // end_listener();


        }
    ])
    ;

}());

