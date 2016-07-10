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


            $scope.x = 0;
            $scope.$watch('x', function () {

                $log.log($scope.x);
            });


        }]);

}());

