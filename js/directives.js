(function() {

    'use strict';

    var app = angular.module('myApp');


    app.directive('desiredCards', function () {
        return {
            restrict: 'E',
            templateUrl: 'prob_items.html'
        };
    });
    app.directive('probabilityTable', function () {
        return {
            restrict: 'E',
            templateUrl: 'prob_table.html'
        };
    });

    board.directive('dealerHand', function () {
        return {
            restrict: 'E',
            templateUrl: 'dealer_hand.html'
        };
    });

    board.directive('playerHand', function () {
        return {
            restrict: 'E',
            templateUrl: 'player_hand.html'
        };
    });

    board.directive('board', function () {
        return {
            restrict: 'A',
            templateUrl: 'board.html'
        };
    });

}());