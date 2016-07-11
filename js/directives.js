(function() {

    'use strict';

    var app = angular.module('myApp');

    app.directive('myElem', function () {
        return {
            restrict: 'E',
            templateUrl: 'set_items.html'
        };
    });

}());