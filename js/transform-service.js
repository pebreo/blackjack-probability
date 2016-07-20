(function () {
    //'use strict';

    var app = angular.module('myApp');

    app.service('transform', ['myservice', 'math', function (myservice, math) {
        this.baz = 'baz value!';

        // test_desired_hands = [{"hand_value":10,"hand":[{"id":10,"rank":"10","rank_integer":[10],"suit":"clubs","show":true}]},{"hand_value":10,"hand":[{"id":11,"rank":"j","rank_integer":[10],"suit":"clubs","show":true}]},{"hand_value":10,"hand":[{"id":12,"rank":"q","rank_integer":[10],"suit":"clubs","show":true}]},{"hand_value":10,"hand":[{"id":13,"rank":"k","rank_integer":[10],"suit":"clubs","show":true}]},{"hand_value":10,"hand":[{"id":23,"rank":"10","rank_integer":[10],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":24,"rank":"j","rank_integer":[10],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":25,"rank":"q","rank_integer":[10],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":26,"rank":"k","rank_integer":[10],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":9,"rank":"9","rank_integer":[9],"suit":"clubs","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":22,"rank":"9","rank_integer":[9],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":2,"rank":"2","rank_integer":[2],"suit":"clubs","show":true},{"id":8,"rank":"8","rank_integer":[8],"suit":"clubs","show":true}]},{"hand_value":10,"hand":[{"id":2,"rank":"2","rank_integer":[2],"suit":"clubs","show":true},{"id":21,"rank":"8","rank_integer":[8],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":3,"rank":"3","rank_integer":[3],"suit":"clubs","show":true},{"id":7,"rank":"7","rank_integer":[7],"suit":"clubs","show":true}]},{"hand_value":10,"hand":[{"id":3,"rank":"3","rank_integer":[3],"suit":"clubs","show":true},{"id":20,"rank":"7","rank_integer":[7],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":4,"rank":"4","rank_integer":[4],"suit":"clubs","show":true},{"id":6,"rank":"6","rank_integer":[6],"suit":"clubs","show":true}]},{"hand_value":10,"hand":[{"id":4,"rank":"4","rank_integer":[4],"suit":"clubs","show":true},{"id":19,"rank":"6","rank_integer":[6],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":5,"rank":"5","rank_integer":[5],"suit":"clubs","show":true},{"id":18,"rank":"5","rank_integer":[5],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":6,"rank":"6","rank_integer":[6],"suit":"clubs","show":true},{"id":17,"rank":"4","rank_integer":[4],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":7,"rank":"7","rank_integer":[7],"suit":"clubs","show":true},{"id":16,"rank":"3","rank_integer":[3],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":8,"rank":"8","rank_integer":[8],"suit":"clubs","show":true},{"id":15,"rank":"2","rank_integer":[2],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":9,"rank":"9","rank_integer":[9],"suit":"clubs","show":true},{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true},{"id":22,"rank":"9","rank_integer":[9],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":15,"rank":"2","rank_integer":[2],"suit":"diams","show":true},{"id":21,"rank":"8","rank_integer":[8],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":16,"rank":"3","rank_integer":[3],"suit":"diams","show":true},{"id":20,"rank":"7","rank_integer":[7],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":17,"rank":"4","rank_integer":[4],"suit":"diams","show":true},{"id":19,"rank":"6","rank_integer":[6],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":2,"rank":"2","rank_integer":[2],"suit":"clubs","show":true},{"id":7,"rank":"7","rank_integer":[7],"suit":"clubs","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":2,"rank":"2","rank_integer":[2],"suit":"clubs","show":true},{"id":20,"rank":"7","rank_integer":[7],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":3,"rank":"3","rank_integer":[3],"suit":"clubs","show":true},{"id":6,"rank":"6","rank_integer":[6],"suit":"clubs","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":3,"rank":"3","rank_integer":[3],"suit":"clubs","show":true},{"id":19,"rank":"6","rank_integer":[6],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":4,"rank":"4","rank_integer":[4],"suit":"clubs","show":true},{"id":5,"rank":"5","rank_integer":[5],"suit":"clubs","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":4,"rank":"4","rank_integer":[4],"suit":"clubs","show":true},{"id":18,"rank":"5","rank_integer":[5],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":5,"rank":"5","rank_integer":[5],"suit":"clubs","show":true},{"id":17,"rank":"4","rank_integer":[4],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":6,"rank":"6","rank_integer":[6],"suit":"clubs","show":true},{"id":16,"rank":"3","rank_integer":[3],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":7,"rank":"7","rank_integer":[7],"suit":"clubs","show":true},{"id":15,"rank":"2","rank_integer":[2],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":8,"rank":"8","rank_integer":[8],"suit":"clubs","show":true},{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true},{"id":21,"rank":"8","rank_integer":[8],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":15,"rank":"2","rank_integer":[2],"suit":"diams","show":true},{"id":20,"rank":"7","rank_integer":[7],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":16,"rank":"3","rank_integer":[3],"suit":"diams","show":true},{"id":19,"rank":"6","rank_integer":[6],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":1,"rank":"a","rank_integer":[1,11],"suit":"clubs","show":true},{"id":17,"rank":"4","rank_integer":[4],"suit":"diams","show":true},{"id":18,"rank":"5","rank_integer":[5],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":2,"rank":"2","rank_integer":[2],"suit":"clubs","show":true},{"id":3,"rank":"3","rank_integer":[3],"suit":"clubs","show":true},{"id":5,"rank":"5","rank_integer":[5],"suit":"clubs","show":true}]},{"hand_value":10,"hand":[{"id":2,"rank":"2","rank_integer":[2],"suit":"clubs","show":true},{"id":3,"rank":"3","rank_integer":[3],"suit":"clubs","show":true},{"id":18,"rank":"5","rank_integer":[5],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":2,"rank":"2","rank_integer":[2],"suit":"clubs","show":true},{"id":4,"rank":"4","rank_integer":[4],"suit":"clubs","show":true},{"id":17,"rank":"4","rank_integer":[4],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":2,"rank":"2","rank_integer":[2],"suit":"clubs","show":true},{"id":5,"rank":"5","rank_integer":[5],"suit":"clubs","show":true},{"id":16,"rank":"3","rank_integer":[3],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":2,"rank":"2","rank_integer":[2],"suit":"clubs","show":true},{"id":6,"rank":"6","rank_integer":[6],"suit":"clubs","show":true},{"id":15,"rank":"2","rank_integer":[2],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":2,"rank":"2","rank_integer":[2],"suit":"clubs","show":true},{"id":7,"rank":"7","rank_integer":[7],"suit":"clubs","show":true},{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":2,"rank":"2","rank_integer":[2],"suit":"clubs","show":true},{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true},{"id":20,"rank":"7","rank_integer":[7],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":2,"rank":"2","rank_integer":[2],"suit":"clubs","show":true},{"id":15,"rank":"2","rank_integer":[2],"suit":"diams","show":true},{"id":19,"rank":"6","rank_integer":[6],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":2,"rank":"2","rank_integer":[2],"suit":"clubs","show":true},{"id":16,"rank":"3","rank_integer":[3],"suit":"diams","show":true},{"id":18,"rank":"5","rank_integer":[5],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":3,"rank":"3","rank_integer":[3],"suit":"clubs","show":true},{"id":4,"rank":"4","rank_integer":[4],"suit":"clubs","show":true},{"id":16,"rank":"3","rank_integer":[3],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":3,"rank":"3","rank_integer":[3],"suit":"clubs","show":true},{"id":5,"rank":"5","rank_integer":[5],"suit":"clubs","show":true},{"id":15,"rank":"2","rank_integer":[2],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":3,"rank":"3","rank_integer":[3],"suit":"clubs","show":true},{"id":6,"rank":"6","rank_integer":[6],"suit":"clubs","show":true},{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":3,"rank":"3","rank_integer":[3],"suit":"clubs","show":true},{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true},{"id":19,"rank":"6","rank_integer":[6],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":3,"rank":"3","rank_integer":[3],"suit":"clubs","show":true},{"id":15,"rank":"2","rank_integer":[2],"suit":"diams","show":true},{"id":18,"rank":"5","rank_integer":[5],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":3,"rank":"3","rank_integer":[3],"suit":"clubs","show":true},{"id":16,"rank":"3","rank_integer":[3],"suit":"diams","show":true},{"id":17,"rank":"4","rank_integer":[4],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":4,"rank":"4","rank_integer":[4],"suit":"clubs","show":true},{"id":5,"rank":"5","rank_integer":[5],"suit":"clubs","show":true},{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":4,"rank":"4","rank_integer":[4],"suit":"clubs","show":true},{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true},{"id":18,"rank":"5","rank_integer":[5],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":4,"rank":"4","rank_integer":[4],"suit":"clubs","show":true},{"id":15,"rank":"2","rank_integer":[2],"suit":"diams","show":true},{"id":17,"rank":"4","rank_integer":[4],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":5,"rank":"5","rank_integer":[5],"suit":"clubs","show":true},{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true},{"id":17,"rank":"4","rank_integer":[4],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":5,"rank":"5","rank_integer":[5],"suit":"clubs","show":true},{"id":15,"rank":"2","rank_integer":[2],"suit":"diams","show":true},{"id":16,"rank":"3","rank_integer":[3],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":6,"rank":"6","rank_integer":[6],"suit":"clubs","show":true},{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true},{"id":16,"rank":"3","rank_integer":[3],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":7,"rank":"7","rank_integer":[7],"suit":"clubs","show":true},{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true},{"id":15,"rank":"2","rank_integer":[2],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true},{"id":15,"rank":"2","rank_integer":[2],"suit":"diams","show":true},{"id":20,"rank":"7","rank_integer":[7],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true},{"id":16,"rank":"3","rank_integer":[3],"suit":"diams","show":true},{"id":19,"rank":"6","rank_integer":[6],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":14,"rank":"a","rank_integer":[1,11],"suit":"diams","show":true},{"id":17,"rank":"4","rank_integer":[4],"suit":"diams","show":true},{"id":18,"rank":"5","rank_integer":[5],"suit":"diams","show":true}]},{"hand_value":10,"hand":[{"id":15,"rank":"2","rank_integer":[2],"suit":"diams","show":true},{"id":16,"rank":"3","rank_integer":[3],"suit":"diams","show":true},{"id":18,"rank":"5","rank_integer":[5],"suit":"diams","show":true}]}];

        this.make_dh_grouped = function(hand_set) {
            var dh_with_rank_str = _.map(hand_set, function (hand_set) {
                var rank_str = '';
                var ranks = [];
                var hand_with_rank_str = {};
                hand_set.hand.forEach(function (h) {
                    ranks.push(h.rank);
                });
                rank_str = ranks.join(',');

                hand_with_rank_str = {
                    rank_str: rank_str,
                    hand_value: hand_set.hand_value,
                    hand: hand_set.hand,
                }
                return hand_with_rank_str;
            });
            var dh_grouped = _.groupBy(dh_with_rank_str, function (hand_set) {
                return hand_set.rank_str;
            });
            // console.log(JSON.stringify(dh_grouped));
            return dh_grouped;
        };


        this.get_probability = function (card, key) {
            return ["1", "3"];
        };
        this.get_probability_string = function (prob) {
            return "1/58";
        };
        this.get_rank_string = function (rank) {
            var rank_str = rank.rank + " of ";
            var temp = [];
            temp.push('(');
            for (var i = 0; i < rank.suits.length; i++) {
                temp.push('&');
                temp.push(rank.suits[i]);
                if (i == rank.suits.length - 1) {
                    temp.push(';');
                } else if (rank.suits.length == 1) {
                    temp.push(';');
                } else {
                    temp.push('; or ');
                }
            }
            temp.push(')');
            suit_str = temp.join('');
            return '[' + rank_str + suit_str + ']';
        };

        this.make_rank_suit_string = function (rank_set) {

            var temp = [];
            for (var i = 0; i < rank_set.length; i++) {
                temp.push(rank_set[i].rank_string);
                if (i == rank_set.length - 1) {
                    temp.push('');
                } else if (rank_set.length == 1) {
                    temp.push('');
                } else {
                    temp.push(' and ');
                }
            }
            rank_suit_str = temp.join('');
            return rank_suit_str;
        };

        this.str2int = function (value) {
            if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
                return Number(value);
            return NaN;
        };

        this.get_total_probability_string_old = function (rank_set) {
            var total_numerator = 0;
            var total_denom = 0;
            // each rank
            //console.log(JSON.stringify(rank_set));
            _.each(rank_set, function (suit, key) {
                var prob = suit.prob[0];
                total_numerator = total_numerator + parseInt(prob[0]);
                total_denom = total_denom + parseInt(prob[1]);
            });
            return total_numerator.toString() + "/" + total_denom.toString();

        };

        this.get_total_probability_string = function (rank_set) {
            return 'dummy';
        };
        this.is_in_deck = function(card_id, deck, player_hand, dealer_hand) {
            player_hand = player_hand !== undefined ? player_hand : myservice.player_hand;
            dealer_hand = dealer_hand !== undefined ? dealer_hand : myservice.dealer_hand;
            // console.log(deck.length);
            var player_dealer_cards = Array.prototype.concat([], player_hand, dealer_hand);
            var shown_cards = _.filter(player_dealer_cards, 'show');
            var sc_ids = _.map(shown_cards, function(card){return card.id});
            var available_cards = _.filter(deck, function(card){
                return !(_.includes(sc_ids, card.id));
            }); 
            // console.log(available_cards.length);
            var available_card_ids = _.map(available_cards, 'id');
            return _.includes(available_card_ids, card_id);

        };

        this.get_available_cards = function(deck, player_hand, dealer_hand) {
            player_hand = player_hand !== undefined ? player_hand : myservice.player_hand;
            dealer_hand = dealer_hand !== undefined ? dealer_hand : myservice.dealer_hand;
            // console.log(deck.length);
            var player_dealer_cards = Array.prototype.concat([], player_hand, dealer_hand);
            var shown_cards = _.filter(player_dealer_cards, 'show');
            var sc_ids = _.map(shown_cards, function(card){return card.id});
            var available_cards = _.filter(deck, function(card){
                return !(_.includes(sc_ids, card.id));
            }); 
            return available_cards;

        };
        this.transform_step1 = function(rank_str_set, key){
                // for each hand_set
                var self = this;
                var rank_suit_pair = [];

                //make this a fxn
                _.each(rank_str_set, function (hand_set, key) {
                    // for each card                    
                    _.each(hand_set.hand, function (card, key) {
                        rank_suit_pair.push(
                            {
                                rank: card.rank,
                                suit: card.suit,
                                probability: self.get_probability(card.rank, card.suit),
                                hand_value: hand_set.hand_value,
                                card_id: card.id
                            }
                        );
                    });
                });
                // make this a fxn
                var rs_pair1 = _.groupBy(rank_suit_pair, 'rank');
                // console.log(JSON.stringify(rs_pair1)); 
                return rs_pair1;
        };

        this.transform_step2_old = function(rs_pair1) {
                var self = this;
                return  _.map(rs_pair1, function (rank_set, key) {
                    var obj = {};
                    var suits = _.map(rank_set, function (rank) {
                        return rank.suit
                    });
                    var probs = _.map(rank_set, function (rank) {
                        return rank.probability
                    });
                    var card_ids = _.map(rank_set,function (r) {
                        return r.card_id
                    });
                    obj = {
                        rank: key,
                        suits: suits,
                        probs: probs,
                        card_ids: card_ids
                    };
                    return obj;
                });
        };
        this.transform_step2 = function(rs_pair1, static_deck, player_hand, dealer_hand) {
                var self = this;
                return  _.map(rs_pair1, function (rank_set, key) {
                    var obj = {};
                    var suits = _.map(rank_set, function (rank) {
                        return rank.suit
                    });
                    suits = _.uniq(suits);

                    var probs = _.map(rank_set, function (rank) {
                        return rank.probability
                    });
                    var card_ids = _.map(rank_set,function (r) {
                        return r.card_id
                    });
                    var cards_available_to_count = _.reduce(card_ids, function (sum, card_id) {
                         if(self.is_in_deck(card_id, static_deck, player_hand, dealer_hand)){
                            return sum = sum + 1;
                         } {
                            return sum = sum + 0;
                         }
                    }, 0);

                    prob_numerator = _.min([suits.length, cards_available_to_count]);

                    obj = {
                        rank: key,
                        suits: suits,
                        probs: probs,
                        prob_numerator: prob_numerator,
                        card_ids: card_ids
                    };
                    return obj;
                });
        };

        this.transform_step2_too_fancy = function(rs_pair1) {
                var self = this; 
                return  _.map(rs_pair1, function (rank_set, key) {
                    var obj = {};
                    var suits =  _.reduce(rank_set, function(hash, card){
                        (hash[card.rank] || (hash[card.rank] = [])).push(card.suit);
                        return hash;
                    }, {});
                    var probs = _.map(rank_set,function (r) {
                        return r.probability
                    });

                    obj = {
                        rank: key,
                        suits: _.uniq(suits[key]),
                        probs: probs,
                        card_ids: card_ids
                    }
                    return obj;
                });
        };

        this.transform_step3 = function(rs_pair2) {
            var self = this;
            return _.map(rs_pair2, function (rank, key) {

                    var obj = {};

                    // rank_str
                    // probability string
                    var rank_string = self.get_rank_string(rank);
                    var probability_string = self.get_probability_string(rank.probs);
                    obj = {
                        rank_string: rank_string,
                        probability_string: probability_string,
                        prob: rank.probs,
                        prob_numerator: rank.prob_numerator
                    };
                    return obj;
                });
        };

        this.transform_make_r_string_html = function(rs_pair3) {
                var r_string = [];
                var prob_str = '';
                _.each(rs_pair3, function (rank, key) {
                    r_string.push(rank.rank_string);
                });
                return r_string.join(' and ');
        };

        this.transform_make_probability_text_old = function(rs_pair3) {
                var total_numerator = 1;
                var total_denom = 1;
                var fractions = [];
                _.each(rs_pair3, function (rank, key) {
                    _.each(rank.prob, function (a) {
                        fractions.push(a[0].toString() + '/' + a[1].toString());
                        total_numerator *= parseInt(a[0]);
                        total_denom *= parseInt(a[1]);
                    });
                });
                return fractions.join(' * ') + ' = ' + total_numerator.toString() + '/' + total_denom.toString();
        };
        this.transform_make_probability_text = function(rs_pair3, static_deck, player_hand, dealer_hand) {
                var self = this;
                player_hand = player_hand !== undefined ? player_hand : myservice.player_hand;
                dealer_hand = dealer_hand !== undefined ? dealer_hand : myservice.dealer_hand;
                var total_numerator = 1;
                var running_denom = self.get_available_cards(static_deck, player_hand, dealer_hand).length;
                var total_denom = 1;
                var fractions = [];
                _.each(rs_pair3, function (rank, key) {
                    fractions.push(rank.prob_numerator.toString() + '/' + running_denom.toString());
                    total_numerator *= parseInt(rank.prob_numerator);
                    total_denom = parseInt(total_denom) * parseInt(running_denom);
                    running_denom = running_denom - 1;
                });
                return fractions.join(' * ') + ' = ' + total_numerator.toString() + '/' + total_denom.toString();
        };
        this.get_rank_probability_fraction = function(rs_pair3, static_deck, player_hand, dealer_hand) {
                var self = this;
                player_hand = player_hand !== undefined ? player_hand : myservice.player_hand;
                dealer_hand = dealer_hand !== undefined ? dealer_hand : myservice.dealer_hand;
                var total_numerator = 1;
                var running_denom = self.get_available_cards(static_deck, player_hand, dealer_hand).length;
                var total_denom = 1;
                var fractions = [];
                _.each(rs_pair3, function (rank, key) {
                    fractions.push(rank.prob_numerator.toString() + '/' + running_denom.toString());
                    total_numerator *= parseInt(rank.prob_numerator);
                    total_denom = parseInt(total_denom) * parseInt(running_denom);
                    running_denom = running_denom - 1;
                });
                return [total_numerator, total_denom];
        };

        this.make_suits_group_string_arr = function(dh_grouped) {
            var self = this;
            var all_prob_fractions = [];
            // console.log(JSON.stringify(dh_grouped));
            suits_grouped = _.map(dh_grouped, function (rank_str_set, key) {
                var obj = {};
                var suit_by_rank_set = [];
                var suits = [];

                // console.log(JSON.stringify(rank_str_set)); 
                rs_pair1 = self.transform_step1(rank_str_set, key);
                // console.log(JSON.stringify(rs_pair1))
                rs_pair2 = self.transform_step2(rs_pair1, myservice.static_deck, myservice.player_hand, myservice.dealer_hand);
                // console.log(JSON.stringify(rs_pair2)); 
                rs_pair3 = self.transform_step3(rs_pair2);
                // console.log(JSON.stringify(rs_pair3)); 
                var r_string_html = self.transform_make_r_string_html(rs_pair3);

                // var probability_text = self.transform_make_probability_text(rs_pair3);
                var probability_text = self.transform_make_probability_text(rs_pair3, myservice.static_deck, myservice.player_hand, myservice.dealer_hand);

                var prob_fraction = self.get_rank_probability_fraction(rs_pair3, myservice.static_deck, myservice.player_hand, myservice.dealer_hand);
                all_prob_fractions.push(prob_fraction);

                obj = {
                    hand_value: key,
                    rank_str: key,
                    rank_str_html: r_string_html,
                    prob_text: probability_text

                };
                return obj;
            });
            //console.log(all_prob_fractions);
            var total_prob = math.add_fractions_arr(all_prob_fractions);
            total_prob = math.reduce_fraction.reduce(total_prob[0], total_prob[1]);
            console.log('total probabilyt ');
            console.log(JSON.stringify(total_prob));
            var p = (total_prob[0] / total_prob[1]).toFixed(3)*100;
            console.log("percent prob " + p);
            return suits_grouped;
        };

    }]);

}());
