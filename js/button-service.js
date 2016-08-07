(function () {
    //'use strict';

    angular.module('Button', ['Math', 'Board'])
        .service('ButtonService', ['math', 'BoardService', function (math, BoardService) {
            this.buttons = {
                'dealer': [
                    {name: 'Deal', action: null, who: 'dealer'},
                    {name: 'Clear Table', action: null, who: 'dealer'}
                ],
                'player': [
                    {name: 'Hit', action: null, who: 'player'},
                    {name: 'Stand', action: null, who: 'player'}
                ]

            }

        }]);


}());