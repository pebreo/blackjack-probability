(function () {
    //'use strict';

    var app = angular.module('myApp');

    app.filter('unsafe', ['$sce', function($sce){
        return function(input) {
            return $sce.trustAsHtml;
        };
    }]);

    app.filter('unsafe2', function($sce){return $sce.trustAsHtml;});

    app.filter('capface', function(){
        return function(input){
            var rank = '';
            switch(input) {
                case 'a':
                    rank = 'A';
                    break;
                case 'j':
                    rank = 'J';
                    break;
                case 'q':
                    rank = 'Q';
                    break;
                case 'k':
                    rank = 'K';
                    break;
                default:
                    rank = input;
            }
            return rank;
        }
    });


}());
