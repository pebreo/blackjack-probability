(function () {
    //'use strict';

    angular.module('CustomButton', ['Math'])
        .service('CustomButtonService', ['math', function (math) {

            this.custom_button = {example_hands: [{name:'foo'},{name:'bar'}]};

        }]);


}());