(function () {
    //'use strict';

    angular.module('Stub', [])
        .service('stub_data', [function () {
            this.static_deck = (function () {

                var str2int = function (value) {
                    if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
                        return Number(value);
                    return NaN;
                };
                var rank2integer = function (rank) {
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
                            rank_int.push(str2int(rank));
                    }
                    return rank_int;

                };
                var static_deck = [];
                var suits = ['clubs', 'diams', 'hearts', 'spades'];
                var ranks = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
                var id = 1;

                // ever suit
                for (i = 0; i < suits.length; i++) {
                    // every value
                    for (j = 0; j < ranks.length; j++) {
                        static_deck.push(
                            {
                                id: id,
                                rank: ranks[j],
                                rank_integer: rank2integer(ranks[j]),
                                suit: suits[i],
                                show: true
                            }
                        );
                        id += 1;
                    }
                }
                return static_deck;
            })();

            /*
             e.g. make_hand([['3','spades'], ['a','diams']])
             */
            this.make_hand = function (syms) {
                var self = this;
                var hand = [];
                _.each(syms, function (item) {
                    hand.push(_.find(self.static_deck, {rank: item[0], suit: item[1]}))
                });
                return hand;
            };

            this.make_modified_deck = function (player_hand, dealer_hand) {
                var self = this;
                var to_remove = Array.prototype.concat(player_hand, dealer_hand);
                return _.remove(self.static_deck, function (card) {
                    return !(_.includes(to_remove, card));
                });
            };


        }]);


}());