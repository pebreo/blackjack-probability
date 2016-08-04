(function() {

    'use strict';

    var app = angular.module('myApp');
    var board = angular.module('Board');


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
            require: 'ngModel',
            scope: {
              ngModel: '='
            },
            templateUrl: 'dealer_hand.html'
        };
    });

    board.directive('playerHand', function () {
        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
              ngModel: '='
            },
            templateUrl: 'player_hand.html'
        };
    });

    board.directive('board', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
              ngModel: '='
            },
            templateUrl: 'board.html'
        };
    });

}());