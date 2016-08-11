/*

i have to clean dh_by_count, line 691

 */

describe("CustomButtonService", function() {
    var BoardService, math;
    // setup the angular module
    beforeEach(module('Board'));
    beforeEach(module('Math'));

    // setup the service
    beforeEach(inject(function(_BoardService_, _math_) {
        BoardService = _BoardService_;
        math = _math_;
    }));

    describe("buildEmptyHandsAndNewDeck", function(){
       it("player_hand and dealer_hand should be empty arrays", function(){
          BoardService.buildEmptyHandsAndNewDeck();
            expect(BoardService.player_hand.length).toEqual(0);
            expect(BoardService.player_hand.length).toEqual(0);
       });
        it("current deck should have 52 cards", function(){
          BoardService.buildEmptyHandsAndNewDeck();
            var current_deck = BoardService.current_deck;
            expect(current_deck.length).toEqual(52);
       });
        it("current deck should have 4 suits", function(){
            BoardService.buildEmptyHandsAndNewDeck();
            var current_deck = BoardService.current_deck;
            grouped_cards = _.groupBy(current_deck, 'suit');

            expect(Object.keys(grouped_cards).length).toEqual(4);
       });
        it("current deck 13 cards for each of the 4 suits", function(){
            BoardService.buildEmptyHandsAndNewDeck();
            var current_deck = BoardService.current_deck;
            grouped_cards = _.groupBy(current_deck, 'suit');
            expect(grouped_cards['hearts'].length).toEqual(13);
            expect(grouped_cards['diams'].length).toEqual(13);
            expect(grouped_cards['spades'].length).toEqual(13);
            expect(grouped_cards['clubs'].length).toEqual(13);
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


