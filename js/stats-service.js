(function () {
    //'use strict';

    var app = angular.module('myApp');

    app.service('stats', ['math', 'myservice', function (math, myservice) {
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
        this.make_hand_values = function (hand) {
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

        this.make_combos_with_hand_values = function (card_combos) {
            var self = this;
            var perms_with_values = [];
            _.each(card_combos, function (p) {
                perms_with_values.push(self.make_hand_values(p));
            });
            // console.log(perms_with_values.length);
            var p = _.flatten(perms_with_values);
            return _.groupBy(p, function (hands) {
                return hands.hand_value
            });
        };

        this.make_perms_with_hand_values_old = function (card_perms) {
            var perms_with_values = [];
            _.each(card_perms, function (p) {
                perms_with_values.push(self.make_hand_values(p));
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
        this.get_best_hand_value = function (hand_values) {
            // get anything less than 21
            var max_hand_value = _.max(hand_values);
            if (max_hand_value > 21) {
                return max_hand_value;
            }
            var values = _.filter(hand_values, function (value) {
                return value <= 21
            });
            return _.max(values);
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
            if (desired_card_value >= 15) {

                //console.log('desired_card_value>=15');
                [1, 2, 3, 4].forEach(function (k) {
                    var c = self.combs_choose(deck, k);
                    card_combos = Array.prototype.concat(card_combos, c);
                });
            }
            if (desired_card_value < 15) {
                //console.log('desired_card_value<15');
                [1, 2, 3].forEach(function (k) {
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

                if (desired_card_value2 != 0) {
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


        this.make_count_card_combos = function (deck, desired_card_value) {
            var card_combo_count = [];
            var self = this;
            card_combo_count = [];
            //[{k:1, total_combos:34 },{k:2, total_combos: 43}]
            if (desired_card_value == 0) {
                //console.log('desired_card_value==0');
                var card_combo_count = [];
                return card_combo_count;
            }
            if (desired_card_value >= 15) {
                //console.log('desired_card_value>=15');
                [1, 2, 3, 4].forEach(function (k) {
                    var c = self.combs_choose(deck, k);
                    card_combo_count.push({k: k, total_combos: c.length});
                });
            }
            if (desired_card_value < 15) {
                //console.log('desired_card_value<15');
                [1, 2, 3].forEach(function (k) {
                    var c = self.combs_choose(deck, k);
                    card_combo_count.push({k: k, total_combos: c.length});
                });
            }
            return card_combo_count;
        };


        this.simplify_card_combos_counts = function (combos_count) {
            return _.uniqBy(combos_count, 'k');
            //cc_grouped = _.groupBy(combos_count, 'k');
            //var simplified_combos_count = _.map(Object.keys(cc_grouped), function (group_key) {
            //    var key = cc_grouped[group_key].k;
            //    var group = cc_grouped[group_key];
            //    var new_group = _.reduce(group, function (sum_obj, obj) {
            //        //var total_combos = sum_obj.total_combos + obj.total_combos;
            //        //var desired_cards_count = sum_obj.desired_cards_count + obj.desired_cards_count;
            //        var desired_cards_count = sum_obj.desired_cards_count + obj.desired_cards_count;
            //        var total_combos = sum_obj.total_combos + obj.total_combos;
            //
            //        var frac1 = sum_obj.fraction;
            //        var frac2 = obj.fraction;
            //        var fraction = math.add_fractions(frac1, frac2);
            //
            //        return {
            //            k: group_key,
            //            total_combos: total_combos,
            //            desired_cards_count: desired_cards_count,
            //            fraction: fraction
            //        }
            //
            //    }, {k: group_key, total_combos: 0, desired_cards_count: 0, fraction: [0, 0]});
            //    return new_group;
            //});
            //return simplified_combos_count;
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

        this.check_bust = function (hand_values) {
            var greater_than_21;
            if (hand_values.length == 2) {
                greater_than_21 = _.filter(hand_values, function (value) {
                    return value > 21
                }).length == 2;
            } else {
                greater_than_21 = _.map(hand_values, function (value) {
                    return value > 21
                })[0];
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
        this.decide_winner = function (player_hand, dealer_hand) {
            var self = this;
            //var dh_value = _.min(logic.calc_hand_value($scope.dealer_hand));
            //var ph_value = _.min(logic.calc_hand_value(logic.player_hand));
            var dh_value = self.get_best_hand_value(self.calc_hand_value(dealer_hand));
            var ph_value = self.get_best_hand_value(self.calc_hand_value(player_hand));
            //if(dh_value === undefined) {
            //    console.log('undefined dh_value');
            //    console.log($scope.dealer_hand);
            //    console.log('calc hand value');
            //    console.log(logic.calc_hand_value($scope.dealer_hand));
            //}
            //console.log('best hand dealer ' + dh_value);
            //console.log('best hand player ' + ph_value);

            // check dealer bust
            if (dh_value > 21) {
                console.log('dh value greater than 21');
                return "player_win";

            }
            // tie
            if (dh_value === ph_value) {
                if (dh_value <= 21 && dh_value <= 21) {
                    return "tie";
                }
            }
            if (dh_value <= 21) {
                if (dh_value > ph_value) {
                    return "dealer_win";
                }
            }
            if (ph_value <= 21) {
                if (ph_value > dh_value) {
                    return "player_win";
                }
            }
            return "tie";
        };

        this.fixedHex = function (number, length) {
            var str = number.toString(16).toUpperCase();
            while (str.length < length)
                str = "0" + str;
            return str;
        };

        /* Creates a unicode literal based on the string */
        this.unicodeLiteral = function (str) {
            var self = this;
            var i;
            var result = "";
            for (i = 0; i < str.length; ++i) {
                /* You should probably replace this by an isASCII test */
                if (str.charCodeAt(i) > 126 || str.charCodeAt(i) < 32)
                    result += "\\u" + self.fixedHex(str.charCodeAt(i), 4);
                else
                    result += str[i];
            }

            return result;
        };


        this.fraction2text = function (arr) {
                numer = arr[0].toString();
                denom = arr[1].toString();

                var p = (arr[0] / arr[1]).toFixed(3) * 100;
                p = math.round.round10(p, -3);
                //var p = Math.round((arr[0] / arr[1]);
                return p.toString() + "%" + " (" + numer + "/" + denom + ")";
            };

        this.make_total_count_obj = function(combos_count){
            var combos_count = _.uniqBy(combos_count);
            var self = this;
            var total_count;
            total_count = _.reduce(combos_count, function (sum_obj, combo) {
                var desired_cards_count = sum_obj.desired_cards_count + combo.desired_cards_count;
                var total_combos = sum_obj.total_combos + combo.total_combos;

                return {total_combos: total_combos, desired_cards_count: desired_cards_count};

            }, {total_combos: 0, desired_cards_count: 0});
            total_count['total_prob'] = math.reduce_fraction.reduce(total_count.desired_cards_count, total_count.total_combos);
            total_count['total_prob'] = self.fraction2text(total_count['total_prob']);
            return total_count;
        };

        this.make_and_reduce_combos_count = function(count_card_combos, dh_by_count){
           // make a function
           var  combos_count = _.map(count_card_combos, function (combos) {
                var key = combos.k;
                if (_.includes(Object.keys(dh_by_count), key.toString())) {
                    var desired_card_count = dh_by_count[key.toString()].length;
                    combos['desired_cards_count'] = desired_card_count;
                    combos['fraction'] = math.reduce_fraction.reduce(combos.desired_cards_count, combos.total_combos);
                    return combos;
                } else {
                    combos['desired_cards_count'] = 0;
                    combos['fraction'] = math.reduce_fraction.reduce(0, combos.total_combos);
                    return combos;
                }
            });
            return combos_count;

        };



        //this.make_count_card_combos = function(hand_value, deck){
        //    if (hand_value.length == 1) {
        //        desired_card_value = 21 - hand_value[0];
        //        var card_combos = this.make_card_combos(deck, desired_card_value);
        //        var count_card_combos = this.make_count_card_combos(deck, desired_card_value);
        //        var combo_vals = this.make_combos_with_hand_values(card_combos);
        //
        //        desired_hands = combo_vals[desired_card_value];
        //           // clean here? meaning: remove cards not available in the deck, remove dups
        //        // console.log(desired_hands);
        //    }
        //    if (hand_value.length == 2) {
        //        desired_card_value1 = 21 - hand_value[0];
        //        desired_card_value2 = 21 - hand_value[1];
        //        //var card_combos = this.combs_choose(deck, 3);
        //        var count_card_combos = Array.prototype.concat([],
        //            this.make_count_card_combos(deck, desired_card_value1),
        //            this.make_count_card_combos(deck, desired_card_value2)
        //        );
        //
        //        var card_combos = Array.prototype.concat([],
        //            this.make_card_combos(deck, desired_card_value1),
        //            this.make_card_combos(deck, desired_card_value2)
        //        );
        //        // var card_combos = this.make_card_combos(deck, desired_card_value1);
        //        var combo_vals = this.make_combos_with_hand_values(card_combos);
        //        //console.log(card_combos.length + 'combo vals length');
        //
        //        if (desired_card_value2 != 0) {
        //            desired_hands = Array.prototype.concat([],
        //                combo_vals[desired_card_value1],
        //                combo_vals[desired_card_value2]
        //            );
        //        } else {
        //            desired_hands = combo_vals[desired_card_value1];
        //        }
        //
        //    }
        //    var obj = {};
        //
        //    return count_card_combos;
        //};

        this.make_desired_hands_and_count_card_combos = function(hand_value, deck){
            if (hand_value.length == 1) {
                desired_card_value = 21 - hand_value[0];
                var card_combos = this.make_card_combos(deck, desired_card_value);
                var count_card_combos = this.make_count_card_combos(deck, desired_card_value);
                var combo_vals = this.make_combos_with_hand_values(card_combos);

                desired_hands = combo_vals[desired_card_value];
                   // clean here? meaning: remove cards not available in the deck, remove dups
                // console.log(desired_hands);
            }
            if (hand_value.length == 2) {
                desired_card_value1 = 21 - hand_value[0];
                desired_card_value2 = 21 - hand_value[1];
                //var card_combos = this.combs_choose(deck, 3);
                var count_card_combos = Array.prototype.concat([],
                    this.make_count_card_combos(deck, desired_card_value1),
                    this.make_count_card_combos(deck, desired_card_value2)
                );

                var card_combos = Array.prototype.concat([],
                    this.make_card_combos(deck, desired_card_value1),
                    this.make_card_combos(deck, desired_card_value2)
                );
                // var card_combos = this.make_card_combos(deck, desired_card_value1);
                var combo_vals = this.make_combos_with_hand_values(card_combos);
                //console.log(card_combos.length + 'combo vals length');

                if (desired_card_value2 != 0) {
                    desired_hands = Array.prototype.concat([],
                        combo_vals[desired_card_value1],
                        combo_vals[desired_card_value2]
                    );
                } else {
                    desired_hands = combo_vals[desired_card_value1];
                }

            }
            var obj = {};
            obj = {
                desired_hands: desired_hands,
                count_card_combos: count_card_combos
            };
            return obj;
        };

        this.clean_dh_by_count_with_uniq_objects = function(dh_by_count){
            var new_dh_by_count = {};
            _.each(dh_by_count, function(value, key){
                var dh_group = _.uniqWith(value, _.isEqual);
               new_dh_by_count[key] = dh_group;
            });
            return new_dh_by_count;
        };

        this.make_dh_by_count_and_count_card_combos = function(hand_value, deck) {
            var self = this;

            var temp = self.make_desired_hands_and_count_card_combos(hand_value, deck);
            var desired_hands = temp.desired_hands;
            var count_card_combos = temp.count_card_combos;

            //var foo = make_count_card_combos(hand_value, deck);
            //console.log(foo);
            // or clean here
            var dh_by_count = _.groupBy(desired_hands, function (dh) {
                return dh.hand.length
            });

            //console.log(dh_by_count);
            var dh_by_count = self.clean_dh_by_count_with_uniq_objects(dh_by_count);
            var obj = {
                dh_by_count: dh_by_count,
                count_card_combos: count_card_combos
            };
            return obj;
        };

        this.make_combos_count_fraction_text = function(combos_count){
            var self = this;
            var combos_count_fraction_text = _.map(combos_count, function (combos) {
                combos['fraction'] = self.fraction2text(combos['fraction']);
                return combos;
            });
            return combos_count_fraction_text;
        };

        this.get_available_cards = function (deck, player_hand, dealer_hand) {
            player_hand = player_hand !== undefined ? player_hand : myservice.player_hand;
            dealer_hand = dealer_hand !== undefined ? dealer_hand : myservice.dealer_hand;
            // console.log(deck.length);
            var player_dealer_cards = Array.prototype.concat([], player_hand, dealer_hand);
            var shown_cards = _.filter(player_dealer_cards, 'show');
            var sc_ids = _.map(shown_cards, function (card) {
                return card.id
            });
            var available_cards = _.filter(deck, function (card) {
                return !(_.includes(sc_ids, card.id));
            });
            return available_cards;

        };

        this.get_player_dealer_hand_shown = function(player_hand, dealer_hand) {
            player_hand = player_hand !== undefined ? player_hand : myservice.player_hand;
            dealer_hand = dealer_hand !== undefined ? dealer_hand : myservice.dealer_hand;
            var player_dealer_cards = Array.prototype.concat([], player_hand, dealer_hand);
            return _.filter(player_dealer_cards, function(c){return c.show});
        };

        this.make_k_1_desired_card_string_old = function(dh_by_count){
            var self = this;
            // get desired hands
            var desired_hands = dh_by_count["1"];

            // filter out the cards that are not in player hands
            var avail_cards = self.get_available_cards(myservice.static_deck, myservice.player_hand, myservice.dealer_hand);
            var player_dealer_hands = self.get_player_dealer_hand_shown(myservice.player_hand, myservice.dealer_hand);
            var x = _.filter(desired_hands, function(hand){
               return !(_.includes(player_dealer_hands, hand));
            });
            var player_dealer_hand_ids = _.map(player_dealer_hands, 'id');
            console.log(avail_cards);
            // get available cards
            return null;
        };

        this.get_suit_string = function(suit){
            var suit_string = {
                'clubs':'&clubs;',
                'diams': '&diams;',
                'spades':'&spades;',
                'hearts': '&hearts;'
            };
            return suit_string[suit];
        };

        this.make_string_of_cards_by_suit = function(cards_by_suit){

            var temp = [];
            var suit_string = {
                'clubs':'&clubs;',
                'diams': '&diams;',
                'spades':'&spades;',
                'hearts': '&hearts;'
            };
            _.each(cards_by_suit, function(cards, suit){
                var ranks = _.map(cards, 'rank');
                var rank_str = ranks.join(',');
                temp.push(suit_string[suit] + ":" + rank_str.toUpperCase());
            });
            temp_str = temp.join("<br>");
            return temp_str;
        };

        this.make_string_of_card_value = function(cards){
            var temp = [];
            var suit_string = {
                'clubs':'&clubs;',
                'diams': '&diams;',
                'spades':'&spades;',
                'hearts': '&hearts;'
            };
            uniq_cards = _.uniqWith(cards, _.isEqual);
            _.each(uniq_cards, function(card){
                value_str = card.rank_integer.toString()
               temp.push(card.rank.toUpperCase() + " o f" + suit_string[card.suit] + " - value(s): " + value_str);
            });
            temp_str = temp.join("<br>");
            return temp_str;

        };

        this.make_k_1_desired_card_string = function(dh_by_count){
            var self = this;
            // get desired hands
            var desired_cards = dh_by_count["1"];
            desired_cards = _.map(desired_cards, function(hand){return hand.hand[0]});;
            // filter out the cards that are not in player hands
            var avail_cards = self.get_available_cards(myservice.static_deck, myservice.player_hand, myservice.dealer_hand);
            cards_by_suit = _.groupBy(avail_cards, 'suit');
            var cbs_string = self.make_string_of_cards_by_suit(cards_by_suit);

            var dhbs_string = self.make_string_of_card_value(desired_cards);
            var obj = {
                desired_cards_str: dhbs_string,
                card_combos_str: cbs_string
            };
            return obj;
        //
        };

        this.get_prob_stats = function (hand, deck) {
            var self = this;
            var deck = (deck === undefined) ? this.static_deck : deck;
            if (this.static_deck === undefined) {
                throw 'static_deck not defined';
            }
            var hand_value = [];
            var needed_ranks = [];
            var desired_card_value = 0;
            var obj;
            // make a function
            hand_value = this.calc_hand_value(hand);

            var temp = self.make_dh_by_count_and_count_card_combos(hand_value, deck);
            var count_card_combos = temp.count_card_combos;
            var dh_by_count = temp.dh_by_count;

            var combos_count = self.make_and_reduce_combos_count(count_card_combos, dh_by_count);

            // make a function
            //combos_count = _.filter(combos_count, function(c){return c !== undefined});
            var total_count = self.make_total_count_obj(combos_count);
            //console.log(total_count);
            combos_count = this.simplify_card_combos_counts(combos_count);

            var desired_cards_str_obj = self.make_k_1_desired_card_string(dh_by_count);
            // make a function
            var combos_count_fraction_text = self.make_combos_count_fraction_text(combos_count);
            obj = {
                combos_count: combos_count_fraction_text,
                totals_count: total_count,
                desired_cards_str_obj: desired_cards_str_obj
            };
            return obj;
        };

    }]);
    // app.service('Scopes', function () {
    //     var mem = {};
    //     return {
    //         store: function (key, value) {
    //             mem[key] = value;
    //         },
    //         get: function (key) {
    //             return mem[key];
    //         }
    //     };
    // });

    // using promises
    /*

     Usage: animateService.anim().then(function(result){ .. dosomething});
     */
    // app.service('animateService', ['$timeout', '$q', 'Scopes', 'myservice', function ($timeout, $q, myservice) {
    //     return {
    //         anim: function () {
    //             var $scope = Scopes.get('MyCtrl');
    //             var o = $q.defer();
    //             var result = {};
    //             $timeout(function () {


    //                 result = myservice.deal_card($scope.current_deck);
    //                 o.resolve(result);
    //             }, 500);

    //             return o.promise;
    //         }
    //     };

    // }]);





}());
