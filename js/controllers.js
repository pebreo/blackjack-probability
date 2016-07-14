(function () {
    'use strict';

    var app = angular.module('myApp');

    app.controller('MyCtrl', [
        '$rootScope',
        '$scope',
        '$log',
        'myservice',
        'math',
        function ($rootScope, $scope, $log, myservice, math) {
            var logic = myservice;
            logic.setup_static_deck();
            $scope.start_switch = false;
            $scope.samples = [];
            $scope.dealer_hand = [];
            $scope.player_hand = [];
            $scope.deck = [];

            $scope.dealer_hand_value = [];
            $scope.player_hand_value = [];
            $scope.is_end = function() {
                return true;
            };
            $scope.x = 0;

            $scope.start_game = function() {
                $scope.start_switch = true;
            };

            $scope.reset_game = function(){
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

            $scope.first_deal = function(){
                $scope.deck = logic.make_deck();
                logic.blackjack_deal($scope.deck);
                console.log(logic.dealer_hand);
                $scope.dealer_hand = logic.dealer_hand;
                $scope.player_hand = logic.player_hand;

                $scope.dealer_hand_value = logic.calc_hand_value($scope.dealer_hand);
                console.log($scope.dealer_hand_value);

                $scope.player_hand_value = logic.calc_hand_value($scope.player_hand);
                console.log($scope.player_hand_value);
            };

            $scope.$watch('start_switch', function(){
                if($scope.start_switch === true) {
                    $scope.first_deal();
                }
            });


        }]);

}());

