(function() {

    'use strict';

    var app = angular.module('myApp');

    app.directive('dealerHand', function () {
        return {
            restrict: 'E',
            templateUrl: 'dealer_hand.html'
        };
    });

    app.directive('playerHand', function () {
        return {
            restrict: 'E',
            templateUrl: 'player_hand.html'
        };
    });
    app.directive('probabilityTable', function () {
        return {
            restrict: 'E',
            templateUrl: 'prob_items.html'
        };
    });

}());