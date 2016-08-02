/*

i have to clean dh_by_count, line 691

 */


describe("MyCtrl", function() {
    var $controller;

    // setup the angular module
    beforeEach(module('myApp'));

    // setup the controller
    beforeEach(inject(function(_$controller_) {
       $controller = _$controller_;
    }));

    // nested tests
    describe("$scope.is_end()", function(){
        var $scope, controller;

        beforeEach(function() {
            $scope = {};
            controller = $controller('MyCtrl', { $scope: $scope });
        });

        it("should have is_end()", function() {
           console.log($scope.is_end());

        });


    });




});


