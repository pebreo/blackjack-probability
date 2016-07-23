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

    app.filter('cardsymbol', ['$sce',function($sce){
        return function(input){
            var rank = '';
            var count = parseInt(input);
            s_list = [];
            for(var i=0;i<count;i++){
                s_list.push("&#x1F0CF;");
            }
            var s = Array.prototype.join(' ', s_list).trustAsHtml;
            return 'foo';
            return $sce.trustAsHtml(s);
        }
    }]);    


}());
