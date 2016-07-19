(function () {
    'use strict';

    var app = angular.module('myApp');

    app.controller('MyCtrl', [
        '$rootScope',
        '$scope',
        '$log',
        'myservice',
        'transform',
        'math',
        function ($rootScope, $scope, $log, myservice, transform, math) {
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


            $scope.is_end = function() {
                return true;
            };
            $scope.x = 0;

            $scope.toggleActionMarker = function(){
                $scope.action_marker = !$scope.action_marker;
            };

            $scope.start_game = function() {
                $scope.reset_game();
                $scope.start_switch = true;
            };

            $scope.reset_game = function(){
                $scope.message = '';
                $scope.start_switch = false;
                $scope.dealer_hand = [];
                $scope.player_hand = [];
                $scope.deck = [];
                logic.logic_reset();

            };

            $scope.isBlank = function(rank) {
                if(rank=='0') {return true}
                return false;
            };

            $scope.getPlayerHand = function(){
                return logic.player_hand;
            };

            $scope.getDealerHand = function(){
                return logic.dealer_hand;
            };

            $scope.first_deal = function(){
                $scope.current_deck = logic.make_deck();
                logic.setup_static_deck();
                $scope.current_deck = logic.blackjack_deal($scope.current_deck);
                $scope.dealer_hand = logic.dealer_hand;
                console.log('dealer hand');
                console.log(logic.dealer_hand);

                $scope.dealer_hand_value = logic.calc_hand_value(logic.dealer_hand);

                //console.log($scope.dealer_hand_value);

                $scope.player_hand_value = logic.calc_hand_value(logic.player_hand);
                console.log($scope.player_hand_value);


            };

            $scope.deal_to_player = function(){
                $scope.toggleActionMarker();
                var obj = logic.deal_card($scope.current_deck);
                $scope.current_deck = obj.deck;
                logic.player_hand.push(obj.card);
                $scope.check_bust(logic.player_hand);
            };

            $scope.player_stand = function(){
                 $scope.toggleActionMarker();
                //$scope.freeze_buttons();
                $scope.dealer_move();
                // turn off buttons

                // dealer makes move
                //$scope.dealer_move()
            };

            $scope.dealer_move = function(){
              // unhide card
                logic.dealer_hand[1].show = true;
                $scope.dealer_hand = logic.dealer_hand;

                // decided to hit or stand
                var dealer_hand_value = _.min(logic.calc_hand_value($scope.dealer_hand));
                while(dealer_hand_value < 17) {
                    var obj = logic.deal_card($scope.current_deck);
                    $scope.current_deck = obj.deck;
                    logic.dealer_hand.push(obj.card);
                    $scope.dealer_hand = logic.dealer_hand;
                    dealer_hand_value = _.min(logic.calc_hand_value($scope.dealer_hand));
                };

                // decide winner
                // $scope.decide_winner()
            };

            $scope.check_bust = function(player_hand){
                //console.log(logic.check_bust(logic.calc_hand_value(player_hand)));
                if(logic.check_bust(logic.calc_hand_value(player_hand)) === true){
                    $scope.lose_message();
                }
            };

            $scope.decide_winner = function(){

            };

            $scope.lose_message = function(){
                $scope.message = 'You bust. Try again.';
                $scope.freeze_buttons();
                //$scope.reset_game();
            };

            $scope.freeze_buttons = function(){
                $scope.start_switch = false;
            };

            $scope.$watch('start_switch', function(){
                if($scope.start_switch === true) {
                    $scope.first_deal();
                }
            });

            $scope.$watch('action_marker', function(){
                console.log('action');
                // calculate desired cards
                // myservice.get_needed_ranks(hand, deck)


                // display probability
                // transform.make_dh_grouped(desired_cards)
                // transform.make_suits_group_string_arr(dh_grouped)
            });






        }]);

}());

