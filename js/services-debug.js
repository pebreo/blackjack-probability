(function () {
    //'use strict';

    var app = angular.module('myApp');


    app.service('serviceDebug', ['$timeout', '$q', '$rootScope', 'myservice', 'transform', 'stub_data', function ($timeout, $q, $rootScope, myservice, transform, stub_data) {


        var combinations_choose = function (set, k) {
            var i, j, combs, head, tailcombs;
            if (k > set.length || k <= 0) {
                return [];
            }
            if (k == set.length) {
                return [set];
            }
            if (k == 1) {
                combs = [];
                for (i = 0; i < set.length; i++) {
                    combs.push([set[i]]);
                }
                return combs;
            }
            combs = [];
            for (i = 0; i < set.length - k + 1; i++) {
                head = set.slice(i, i + 1);
                tailcombs = combinations_choose(set.slice(i + 1), k - 1);
                for (j = 0; j < tailcombs.length; j++) {
                    combs.push(head.concat(tailcombs[j]));
                }
            }
            return combs;
        };


        this.combs_choose = function (xs, r) {
            return combinations_choose(xs, r);
        };

        this.make_card_combos = function (deck, desired_card_value) {
            var card_combos = [];
            var self = this;
            // when the desired (target) hand value is >= 15 that is you have
            // a hand value of 6 or less then we will create combinations
            // where k=1, k=2, k=3, k=4
            if (desired_card_value == 0) {
                console.log('desired_card_value==0');
                var card_combos = [];
                return card_combos;
            }
            if (desired_card_value >= 15) {-
                console.log('desired_card_value>=15');
                [1, 2, 3, 4].forEach(function (k) {
                    var c = self.combs_choose(deck, k);
                    card_combos = Array.prototype.concat(card_combos, c);
                });
            }
            if (desired_card_value < 15) {
                console.log('desired_card_value<15');
                [1, 2, 3].forEach(function (k) {
                    var c = self.combs_choose(deck, k);
                    card_combos = Array.prototype.concat(card_combos, c);
                });
            }
            return card_combos;
        };
        this.problem_cards = (function(){
            var hands = [
              stub_data.make_hand([ ['a','diams'], ['a','spades'] ]),
              stub_data.make_hand([ ['a','clubs'], ['a','hearts'] ]),
            ];
            var problem_cards = [];
            for(i in hands){
                problem_cards = Array.prototype.concat(problem_cards, hands[i]);
            }
            return problem_cards;
        })();

        this.make_hand_values = function (hand) {
            var self = this;
            var hand_values = [];
            var hand_sum = 0;
            var found_ace = undefined;
            for(i in hand) {
                if(_.includes(self.problem_cards, hand[i])) {
                    // console.log('found aces');
                }
            }
            // count when ace is worth 1
            _.forEach(hand, function (card) {
                hand_sum += card.rank_integer[0];
            });
            hand_values.push({hand_value: hand_sum, hand: hand});
            hand_sum = 0;

            // count when ace is worth 11
            found_ace = _.find(hand, function (card) {
                return card.rank_integer.length == 2
            });
            if (found_ace !== undefined) {
                //console.log('found ace');
                _.forEach(hand, function (card) {
                    if (card.rank_integer.length > 1) {
                        hand_sum += card.rank_integer[1];
                    } else {
                        hand_sum += card.rank_integer[0];
                    }
                });
                hand_values.push({hand_value: hand_sum, hand: hand});
            }
            return hand_values;
        };
        
        this.make_combos_with_hand_values = function (card_combos) {
            var self = this;
            var combos_with_values = [];
            console.log(JSON.stringify(card_combos[939]));
            _.each(card_combos, function (p) {
                combos_with_values.push(self.make_hand_values(p));
            });
            // console.log(JSON.stringify(perms_with_values[1]));
            // localStorage.setItem('myStorage', JSON.stringify(perms_with_values));
            var p = _.flatten(combos_with_values);

            var gb = _.groupBy(p, function (hands) {
                return hands.hand_value
            });
            console.log(gb[3]);
            // console.log(gb);
            return gb;            
        };


        this.make_perms_with_hand_values = function (card_perms) {
            var perms_with_values = [];
            _.each(card_perms, function (p) {
                perms_with_values.push(make_hand_values(p));
            });
            var p = _.flatten(perms_with_values);
            return _.groupBy(p, function (hands) {
                return hands.hand_value
            });
        };        
        

    }]);




}());
