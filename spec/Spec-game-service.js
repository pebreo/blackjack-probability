/*

i have to clean dh_by_count, line 691

 */

describe("GameManager", function() {
    var BoardService, math, GameManager;
    // setup the angular module
    beforeEach(module('Game'));
    beforeEach(module('Math'));
    beforeEach(module('Board'));

    // setup the service
    beforeEach(inject(function(_BoardService_, _math_, _GameManager_) {
        BoardService = _BoardService_;
        math = _math_;
        GameManager = _GameManager_;
    }));

    describe("action", function(){
       it("should blah", function(){
          expect(true).toEqual(false);
       });
    });



});


