
(function () {
        angular.module('Math', [])
        .service('math', function () {


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
            this.lcm = function (arr) {
                /*
                 function range(min, max) {
                 var arr = [];
                 for (var i = min; i <= max; i++) {
                 arr.push(i);
                 }
                 return arr;
                 }
                 */
                var min, range;
                range = arr;
                if (arr[0] > arr[1]) {
                    min = arr[1];
                }
                else {
                    min = arr[0]
                }

                function gcd(a, b) {
                    return !b ? a : gcd(b, a % b);
                }

                function lcm(a, b) {
                    return (a * b) / gcd(a, b);
                }

                var multiple = min;
                range.forEach(function (n) {
                    multiple = lcm(multiple, n);
                });

                return multiple;
            };
            this.add_fractions = function (frac1, frac2) {
                var self = this;
                // get the denominator
                denom1 = frac1[1];
                denom2 = frac2[1];
                num1 = frac1[0];
                num2 = frac2[0];

                if (num1 === 0 && denom1 === 0) {
                    return [num2, denom2];
                }
                ;
                if (num2 === 0 && denom2 === 0) {
                    return [num1, denom1];
                }
                ;

                if (num1 === 0 && denom1 === 0) {
                    if (num1 === 0 && denom1 === 0) {
                        return [0, 0];
                    }
                    ;
                }
                ;

                if ((num1 !== 0) && (denom1 === 0)) {
                    return [0, 0];
                }
                ;
                if ((num2 !== 0) && (denom2 === 0)) {
                    return [0, 0];
                }

                // get the least common multiple
                var lcm = self.lcm([denom1, denom2]);
                //console.log('lcm is  ' + lcm);
                // calculate new numerotar for frac1
                var mult1 = lcm / denom1;
                var num1 = mult1 * num1;

                // calculate the nume numerator for frac2
                var mult2 = lcm / denom2;
                var num2 = mult2 * num2;

                var new_num = num1 + num2
                return [new_num, lcm];
            };

            this.multiply_fractions = function (frac1, frac2) {
                var self = this;
                // get the denominator
                denom1 = frac1[1];
                denom2 = frac2[1];
                num1 = frac1[0];
                num2 = frac2[0];

                if (num1 === 0 && denom1 === 0) {
                    return [0, 0];
                }
                ;
                if (num2 === 0 && denom2 === 0) {
                    return [0, 0];
                }
                ;

                if (num1 === 0 && denom1 === 0) {
                    if (num1 === 0 && denom1 === 0) {
                        return [0, 0];
                    }
                    ;
                }
                ;

                if ((num1 !== 0) && (denom1 === 0)) {
                    return [0, 0];
                }
                ;
                if ((num2 !== 0) && (denom2 === 0)) {
                    return [0, 0];
                }


                return [num1 * num2, denom1 * denom2];
            };

            this.fraction2text = function (fraction) {
                return fraction[0].toString() + "/" + fraction[1].toString();
            };

            /*
             Usage: reduce_fraction.reduce(9,12)
             result: [3,4]
             */
            this.reduce_fraction = (function () {
                //Euclid's Algorithm
                var getGCD = function (n, d) {
                    var numerator = (n < d) ? n : d;
                    var denominator = (n < d) ? d : n;
                    var remainder = numerator;
                    var lastRemainder = numerator;

                    while (true) {
                        lastRemainder = remainder;
                        remainder = denominator % numerator;
                        if (remainder === 0) {
                            break;
                        }
                        denominator = numerator;
                        numerator = remainder;
                    }
                    if (lastRemainder) {
                        return lastRemainder;
                    }
                };

                var reduce = function (n, d) {
                    if (n === 0) {
                        return [n, d];
                    }
                    var gcd = getGCD(n, d);

                    return [n / gcd, d / gcd];
                };

                return {
                    getGCD: getGCD,
                    reduce: reduce
                };

            }());


            /*
             Usage: add_fractions_arr([ [1,2], [3,4], [4,5] ])
             result: [41, 20]
             */

            this.add_fractions_arr = function (fractions_arr) {
                var self = this;
                return _.reduce(fractions_arr, function (sum, frac) {
                    return self.add_fractions(sum, frac);
                }, [0, 0]);
            };


            /*
             Usage:
             round.round10(55.55, -1);   // 55.6
             round.round10(55.549, -1);  // 55.5
             round.round10(55, 1);       // 60
             round.round10(54.9, 1);     // 50
             round.round10(-55.55, -1);  // -55.5
             round.round10(-55.551, -1); // -55.6
             round.round10(-55, 1);      // -50
             round.round10(-55.1, 1);    // -60
             round.round10(1.005, -2);   // 1.01 -- compare this with Math.round(1.005*100)/100 above
             // Floor
             round.floor10(55.59, -1);   // 55.5
             round.floor10(59, 1);       // 50
             round.floor10(-55.51, -1);  // -55.6
             round.floor10(-51, 1);      // -60
             // Ceil
             round.ceil10(55.51, -1);    // 55.6
             round.ceil10(51, 1);        // 60
             round.ceil10(-55.59, -1);   // -55.5
             round.ceil10(-59, 1);       // -50

             */
            this.round = (function () {

                function decimalAdjust(type, value, exp) {
                    // If the exp is undefined or zero...
                    if (typeof exp === 'undefined' || +exp === 0) {
                        return Math[type](value);
                    }
                    value = +value;
                    exp = +exp;
                    // If the value is not a number or the exp is not an integer...
                    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
                        return NaN;
                    }
                    // Shift
                    value = value.toString().split('e');
                    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
                    // Shift back
                    value = value.toString().split('e');
                    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
                }


                var round10 = function (value, exp) {
                    return decimalAdjust('round', value, exp);
                }
                var floor10 = function (value, exp) {
                    return decimalAdjust('floor', value, exp);
                };


                var ceil10 = function (value, exp) {
                    return decimalAdjust('ceil', value, exp);

                };
                return {
                    round10: round10,
                    floor10: floor10,
                    ceil10: ceil10
                };

            })();
            /*
             X = [
             {text: 1},
             {text: 2}
             ]
             a = _.map(X, 'text');
             */
        });
}());

