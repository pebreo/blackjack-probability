(function () {
    //'use strict';

    var app = angular.module('myApp');

    app.service('myservice', function () {
        this.baz = 'baz value!';
        this.player_hand = [];
        this.dealer_hand = [];
        this.current_deck = [];
        this.str2int = function (value) {
            if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
                return Number(value);
            return NaN;
        };
        this.static_deck = [];
        this.setup_static_deck = function () {
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

        var combinations_old = function (list) {
            var set = [],
                listSize = list.length,
                combinationsCount = (1 << listSize),
                combination;

            for (var i = 1; i < combinationsCount; i++) {
                var combination = [];
                for (var j = 0; j < listSize; j++) {
                    if ((i & (1 << j))) {
                        combination.push(list[j]);
                    }
                }
                set.push(combination);
            }
            return set;
        };

        var combinations_choose_old = function (list, r) {
            var combos = combinations_old(list);
            var results = _.filter(combos, function (item) {
                return item.length == r;
            });
            return results;
        };

        var combinations_choose = function(set, k)
        {
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

        var permutations_choose = function (xs, r) {
            if (!r) return [];
            return xs.reduce(function (memo, cur, i) {
                var others = xs.slice(0, i).concat(xs.slice(i + 1)),
                    perms = permutations_choose(others, r - 1),
                    newElms = !perms.length ? [[cur]] :
                        perms.map(function (perm) {
                            return [cur].concat(perm)
                        });
                return memo.concat(newElms);
            }, []);
        };

        this.perms_choose = function (xs, r) {
            return permutations_choose(xs, r);
        };
        var make_hand_values = function (hand) {
            var hand_values = [];
            var hand_sum = 0;
            var found_ace = undefined;


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

        this.make_combos_with_hand_values = function(card_combos) {
            return this.make_perms_with_hand_values(card_combos);
        };

        this.make_perms_with_hand_values_old = function (card_perms) {
            var perms_with_values = [];
            _.each(card_perms, function (p) {
                perms_with_values.push(make_hand_values(p));
            });
            return _.flatten(perms_with_values);
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

        this.logic_reset = function () {
            this.player_hand = [];
            this.dealer_hand = [];
            this.setup_static_deck();
        };
        this.get_best_hand_value = function(hand_values){
            // get anything less than 21
            var max_hand_value = _.max(hand_values);
            if(max_hand_value > 21) {
                return max_hand_value;
            }
            var values = _.filter(hand_values, function(value){return value <= 21});
            return _.max(values);
        };
        this.make_card_combos = function(deck, desired_card_value) {
            var card_combos = [];
            var self = this;
            // when the desired (target) hand value is >= 15 that is you have
            // a hand value of 6 or less then we will create combinations
            // where k=1, k=2, k=3, k=4
            if(desired_card_value == 0) {
                var card_combos = [];
                return card_combos;
            }
            if(desired_card_value >= 15) {
                [1,2,3,4].forEach(function(k){
                    var c = self.combs_choose(deck, k);
                    card_combos = Array.prototype.concat(card_combos, c);
                });
            }
            if(desired_card_value < 15) {
                [1,2,3].forEach(function(k){
                    var c = self.combs_choose(deck, k);
                    card_combos = Array.prototype.concat(card_combos, c);
                });
            } 
            return card_combos;
        }

        this.get_needed_ranks = function (hand, deck) {
            var deck = (deck === undefined) ? this.static_deck : deck;
            if (this.static_deck === undefined) {
                throw 'static_deck not defined';
            }
            var hand_value = [];
            var needed_ranks = [];
            var desired_card_value = 0;
            var desired_hands;

            hand_value = this.calc_hand_value(hand);
            if (hand_value.length == 1) {
                desired_card_value = 21 - hand_value[0];
                var card_combos = this.make_card_combos(deck, desired_card_value);
                var combo_vals = this.make_combos_with_hand_values(card_combos);

                desired_hands = combo_vals[desired_card_value];
                // console.log(desired_hands);
            }
            if (hand_value.length == 2) {
                desired_card_value1 = 21 - hand_value[0];
                desired_card_value2 = 21 - hand_value[1];
                //var card_combos = this.combs_choose(deck, 3);
                var card_combos = Array.prototype.concat([],
                    this.make_card_combos(deck, desired_card_value1),
                    this.make_card_combos(deck, desired_card_value2)
                );
                // var card_combos = this.make_card_combos(deck, desired_card_value1);
                var combo_vals = this.make_combos_with_hand_values(card_combos);
                console.log(card_combos.length + 'combo vals length');

                if(desired_card_value2 != 0) {
                    desired_hands = Array.prototype.concat([],
                        combo_vals[desired_card_value1],
                        combo_vals[desired_card_value2]
                    );
                } else {
                    desired_hands = combo_vals[desired_card_value1];
                }

            }
            return desired_hands;
        };

        this.calc_hand_value_old = function (hand) {
            var hand_value;

            function sum_card(sum, card) {
                return sum + card.rank_integer;
            }

            hand_value = _.reduce(hand, sum_card, 0);
            return hand_value;
        };

        this.calc_hand_value = function (hand) {
            var hand_values = [];
            var hand_sum = 0;
            var found_ace = undefined;

            // count when ace is worth 1
            _.forEach(hand, function (card) {
                hand_sum += card.rank_integer[0];
            });
            hand_values.push(hand_sum);
            hand_sum = 0;

            // count when ace is worth 11
            found_ace = _.find(hand, function (card) {
                return card.rank_integer.length == 2
            });
            if (found_ace !== undefined) {
                //console.log('found ace');
                _.forEach(hand, function (card) {
                    if (card.rank_integer.length > 1) {
                        //console.log('found ace card in loop');
                        hand_sum += card.rank_integer[1];
                    } else {
                        hand_sum += card.rank_integer[0];
                    }
                });
                hand_values.push(hand_sum);
            }
            return hand_values;
        };
        this.deal_card = function (deck) {
            var card;
            var obj = {};
            card = _.sampleSize(deck, 1)[0];
            //found = _.find(deck,function(c) {return c.id == card.id});
            new_deck = _.remove(deck, function (c) {
                return !(c.id == card.id)
            });
            obj = {card: card, deck: new_deck};
            return obj;
        };
        this.blackjack_deal = function (deck) {
            var card;
            obj = this.deal_card(deck);
            this.dealer_hand.push(obj.card);

            obj = this.deal_card(obj.deck);
            obj.card.show = false;
            this.dealer_hand.push(obj.card);

            obj = this.deal_card(obj.deck);
            this.player_hand.push(obj.card);

            obj = this.deal_card(obj.deck);
            this.player_hand.push(obj.card);
            return obj.deck;
        };

        this.check_bust = function(hand_values){
            var greater_than_21;
            if(hand_values.length == 2) {
                greater_than_21 = _.filter(hand_values, function (value) {
                        return value > 21
                    }).length == 2;
            } else {
                greater_than_21 = _.map(hand_values, function(value){return value > 21})[0];
            }
            return greater_than_21;
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
        this.make_deck = function () {
            //var suits = ['clubs', 'diamonds', 'hearts', 'spades'];
            var suits = ['clubs', 'diams', 'hearts', 'spades'];
            //var values = [[1, 11], [2], [3], [4], [5], [6], [7], [8], [9], [10], [10], [10], [10]];
            var ranks = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
            //var names = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king']
            var deck = [];
            var id = 1;
            // ever suit
            for (i = 0; i < suits.length; i++) {
                // every value
                for (j = 0; j < ranks.length; j++) {
                    deck.push(
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
            // insert blank card
            /*
             Array.prototype.insert = function (index) {
             this.splice.apply(this, [index, 0].concat(this.slice.call(arguments, 1)));
             };
             deck.insert(0,{id:0, rank:0, suit:'back'});
             */
            return deck;
        };
        this.sample_deck = function (deck, n) {
            // only sample the non-back cards
            var s = _.chain(deck).slice(start = 1).sampleSize(n).value();
            //var s = _.chain(deck).slice(start=0).sampleSize(n).value();
            console.log(s);
            return s;
        };
    });


    app.service('math', function () {


        this.sum = function (obj, key) {
            var arr;
            if (_.isArray(obj) && typeof obj[0] === 'number') {
                arr = obj;
            } else {
                key = key || 'value';
                arr = _.pluck(obj, key);
            }
            var val = 0, i;
            for (i = 0; i < arr.length; i++)
                val += (arr[i] - 0);
            return val;
        };

        this.sort = function (arr) {
            return _.sortBy(arr, _.identity);
        };

        this.mean = ave = average = function (obj, key) {
            return this.sum(obj, key) / _.size(obj);
        };

        this.median = function (arr) {
            arr = arr.slice(0); // create copy
            var middle = (arr.length + 1) / 2,
                sorted = this.sort(arr);
            return (sorted.length % 2) ? sorted[middle - 1] : (sorted[middle - 1.5] + sorted[middle - 0.5]) / 2;
        };

        this.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };

        /*
         Takes a list of integers and returns
         a list of objects that make a histogram from
         range 1 to 21

         params: values - an array of integers

         param: range - an array of integers
         */
        this.make_hist = function (values, range) {
            empty_hist = _.map(range, function (a) {
                return {
                    key: a,
                    freq: 0
                }
            });
            // make a list of objects that have a key and frequency values
            new_hist = _.chain(values).groupBy(function (a) {
                return a
            }).
                map(function (values, key) {
                    return {
                        key: key.toString(),
                        freq: values.length
                    }
                }).sortBy(function (d) {
                    d.key
                }).value();


            var full_hist = [];
            var current_key = undefined;
            var ao = undefined;

            // populate the full_hist list
            _.forEach(empty_hist, function (obj) {
                current_key = obj.key;
                current_freq = obj.freq;
                ao = _.find(new_hist, function (o) {
                    return o.key == current_key && o.freq > 0
                });
                if (ao !== undefined) {
                    current_freq = ao.freq;
                    //console.log(ao);
                }
                full_hist.push({key: current_key, freq: current_freq});
            });
            //console.log(full_hist);
            return full_hist;
        };
        /*
         X = [
         {text: 1},
         {text: 2}
         ]
         a = _.map(X, 'text');
         */

    });

}());
