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

            $scope.start_switch = false;

            $scope.is_end = function() {
                return true;
            };
            $scope.x = 0;

            $scope.start_game = function() {
                $scope.start_switch = true;
            };



        }]);

}());

