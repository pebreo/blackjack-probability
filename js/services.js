(function () {
    //'use strict';

    var app = angular.module('myApp');

    app.service('myservice', function () {
        this.baz = 'baz value!';
        this.player_hand = [];
        this.dealer_hand = [];
        this.str2int = function (value) {
          if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
            return Number(value);
          return NaN;
        }
        this.deal_card = function(deck) {
          var card;
            card = _.sampleSize(deck,1)[0];
            //found = _.find(deck,function(c) {return c.id == card.id});
            removed = _.remove(deck, function(c){return c.id == card.id})[0];
            return card;
        };
        this.rank2integer = function(rank) {
            var rank_int = [];
            switch(rank){
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
            var ranks = ['a','2','3','4','5','6','7','8','9','10','j','q','k'];
            //var names = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king']
            var deck = [];
            var id = 1;
            // ever suit
            for(i=0;i<suits.length;i++) {
               // every value
               for(j=0;j<ranks.length;j++) {
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
            var s = _.chain(deck).slice(start=1).sampleSize(n).value();
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
