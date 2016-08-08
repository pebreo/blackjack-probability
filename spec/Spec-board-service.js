/*

i have to clean dh_by_count, line 691

 */

describe("BoardService", function() {
    var BoardService, math;
    // setup the angular module
    beforeEach(module('Board'));
    beforeEach(module('Math'));

    // setup the service
    beforeEach(inject(function(_BoardService_, _math_) {
        BoardService = _BoardService_;
        math = _math_;
    }));

    describe("buildEmptyHands", function(){
       it("should blah", function(){
          expect(true).toEqual(false);
       });
    });



});


