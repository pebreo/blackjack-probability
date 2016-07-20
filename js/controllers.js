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
        'animateService',
        'probService',
        'Scopes',
        function ($rootScope, $scope, $log, $q, $timeout, $interval, myservice, transform, math, animateService, probService, Scopes) {
            Scopes.store('MyCtrl', $scope);
            var logic = myservice;
            logic.setup_static_deck();
            $scope.start_switch = false;
            $scope.samples = [];
            $scope.current_deck = [];

            $scope.dealer_hand = [];
            $scope.player_hand = [];

            $scope.dealer_hand_value = [];
            $scope.player_hand_value = [];

            $scope.action_marker = true;
            $scope.message = '';

            $scope.desired_cards_prob_html = [];

            $scope.is_end = function () {
                return true;
            };
            $scope.x = 0;

            $scope.toggleActionMarker = function () {
                $scope.action_marker = !$scope.action_marker;
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


            $scope.first_deal = function () {
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
                //var t0 = performance.now();
                probService.getData().then(function(result){
                    $scope.desired_cards_prob_html = result;
                    //var t1 = performance.now();
                    //console.log('duration ' + (t1-t0));
                });


            };

            $scope.deal_to_player = function () {
                $scope.toggleActionMarker();
                var obj = logic.deal_card($scope.current_deck);
                $scope.current_deck = obj.deck;
                logic.player_hand.push(obj.card);
                $scope.check_bust(logic.player_hand);
            };

            $scope.player_stand = function () {
                $scope.toggleActionMarker();
                //$scope.freeze_buttons();
                $scope.dealer_move();
                // turn off buttons

                // dealer makes move
                //$scope.dealer_move()
            };


            $scope.dealer_move_experiment1 = function() {
                // unhide card
                logic.dealer_hand[1].show = true;
                $scope.dealer_hand = logic.dealer_hand;

                // decided to hit or stand
                var dealer_hand_value = _.min(logic.calc_hand_value($scope.dealer_hand));
                while (dealer_hand_value < 17) {
                    var obj = {};
                    animateService.anim().then(function(result){
                        obj = result;
                        console.log('after promise');
                        console.log(obj);
                         $scope.current_deck = obj.deck;
                        logic.dealer_hand.push(obj.card);
                        dealer_hand_value = _.min(logic.calc_hand_value($scope.dealer_hand));
                    });

                    $scope.dealer_hand = [];
                    $scope.dealer_hand = logic.dealer_hand;

                    console.log('deck size' + $scope.current_deck.length);
                };

                // decide winner
                $scope.decide_winner()
            };

            // IDEA: you can use $watch to watch $scope.dealer_hand_value
            // and do $timeout.cancel(calculation)
            $scope.dealer_move_experiment2 = function () {
                // unhide card

                logic.dealer_hand[1].show = true;
                $scope.dealer_hand = logic.dealer_hand;
                var was_canceled = false;
                // decided to hit or stand
                var dealer_hand_value = _.min(logic.calc_hand_value($scope.dealer_hand));
                $scope.calculation = $interval(function(){
                    if(dealer_hand_value >= 17) {
                        $interval.cancel();
                    }
                    else {
                        var obj = logic.deal_card($scope.current_deck);
                        $scope.current_deck = obj.deck;
                        logic.dealer_hand.push(obj.card);
                        $scope.dealer_hand = [];
                        $scope.dealer_hand = logic.dealer_hand;
                        dealer_hand_value = _.min(logic.calc_hand_value($scope.dealer_hand));
                        console.log('deck size' + $scope.current_deck.length);
                    };
                },1000,30);

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
                };

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

            $scope.decide_winner = function(){
                var outcome = logic.decide_winner(logic.player_hand, $scope.dealer_hand);
                console.log('the message' + outcome);
                switch(outcome){
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
                if(dh_value > 21) {
                    console.log('dh value greater than 21');
                     $scope.show_message("player_win");
                    return;
                };
                // tie
                if (dh_value === ph_value) {
                    $scope.show_message("tie");
                } else if(dh_value <= 21) {
                    if(dh_value > ph_value) {
                        $scope.show_message("dealer_win");
                    }

                } else if(ph_value <= 21)
                {
                    if (ph_value > dh_value) {
                        $scope.show_message("player_win");
                    }
                }
                else {
                    $scope.show_message("tie");
                };
            };

            $scope.show_message = function(message) {
                $scope.message = message;
                $scope.freeze_buttons();
            };

            $scope.show_message_old = function (message) {
                console.log('the message' + message);
                switch(message){
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
            };

            var end_listener = $scope.$watch('start_switch', function () {
                if ($scope.start_switch === true) {
                    $scope.first_deal();
                }
            });

            // clear the watch because we are only using it one time
            end_listener();

           



        }
    ])
    ;

}());

