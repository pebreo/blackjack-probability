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

    app.filter('cardsymbol', ['$sce','myservice',function($sce, myservice){
        return function(input){
           var count = parseInt(input);
            
            switch(count) {
                case 1:
                    rank = "&#x1F0CF;";
                    break;
                case 2:
                    rank = "&#x1F0CF;&#x1F0CF;";
                    break;
                case 3:
                    rank = "&#x1F0CF;&#x1F0CF;&#x1F0CF;";
                    break;
                case 4:
                    rank = "&#x1F0CF;&#x1F0CF;&#x1F0CF;&#x1F0CF;";
                case 5:
                    rank = "&#x1F0CF;&#x1F0CF;&#x1F0CF;&#x1F0CF;&#x1F0CF;";
                    break;
                default:
                    rank = '';
            }
            return $sce.trustAsHtml(rank);
            }
        
    }]);     

    app.filter('cardsymbol_old', ['$sce','myservice',function($sce, myservice){
        return function(input){
            var rank = '';
            var count = parseInt(input);
            s_list = [];

            for(var i=0;i<count;i++){
                s_list.push(myservice.unicodeLiteral("&#x1F0CF;"));
            }
            var s = Array.prototype.join("", s_list);
            // console.log(s);
            return $sce.trustAsHtml(s);
        }
    }]);    


}());
