(function () {
    //'use strict';

    angular.module('Board',['Math'])
    .service('BoardService', ['math', function (math) {
        this.baz = 'baz value!';
        this.player_hand = [];
        this.dealer_hand = [];
        this.current_deck = [];
        this.static_deck = [];
        this.setup_static_deck = function () {
            this.static_deck = [];
            var suits = ['clubs', 'diams', 'hearts', 'spades'];
            var ranks = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
            var id = 1;

            // ever suit
            for (i = 0; i < suits.length; i++) {
                // every value
                for (j = 0; j < ranks.length; j++) {
                    this.static_deck.push(
                        {
                            id: id,
                            rank: ranks[j],
                            rank_integer: this.rank2integer(ranks[j]),
                            suit: suits[i],
                            show: true
                        }
                    );
                    id += 1;
                }
            }

        };

        this.rank2integer = function (rank) {
            var rank_int = [];
            switch (rank) {
                case 'a':
                    rank_int.push(1);
                    rank_int.push(11);
                    break;
                case 'j':
                    rank_int.push(10);
                    break;
                case 'q':
                    rank_int.push(10);
                    break;
                case 'k':
                    rank_int.push(10);
                    break;
                default:
                    rank_int.push(this.str2int(rank));
            }
            return rank_int;

        };

        this.str2int = function (value) {
            if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
                return Number(value);
            return NaN;
        };


    }]);


}());