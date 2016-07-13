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
            $scope.logic = myservice;
            $scope.start_switch = false;
            $scope.samples = [];
            $scope.is_end = function() {
                return true;
            };
            $scope.x = 0;

            $scope.start_game = function() {
                $scope.start_switch = true;
            };
            var d = myservice.make_deck();
            $scope.samples = myservice.sample_deck(d, 4);
            $log.log($scope.samples);

            $scope.isBlank = function(rank) {
                if(rank=='0') {return true}
                return false;
            };

        }]);

}());

