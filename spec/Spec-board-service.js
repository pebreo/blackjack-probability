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
       it("player_hand and dealer_hand should be empty arrays", function(){
          expect(true).toEqual(false);
       });
    });

    describe("firstDeal", function(){
       it("player hand should have two shown cards", function(){
          expect(true).toEqual(false);
       });
        it("dealer hand should have 1 shown and 1 hidden card", function(){
          expect(true).toEqual(false);
       });
    });


});


