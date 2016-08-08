(function () {
    //'use strict';

    angular.module('Button', ['Math', 'Board'])
        .service('ButtonService', ['math', 'BoardService', function (math, BoardService) {
            this.buttons = {
                'dealer': [
                    {name: 'Deal', action: 'deal', who: 'dealer'},
                    {name: 'Clear Table', action: 'clear_table', who: 'dealer'}
                ],
                'player': [
                    {name: 'Hit', action: 'hit', who: 'player'},
                    {name: 'Stand', action: 'stand', who: 'player'}
                ]

            }

        }]);


}());