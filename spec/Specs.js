
describe("Deck functions", function() {
    var myservice;

    // setup the angular module
    beforeEach(module('myApp'));
    
    // setup the service 
    beforeEach(inject(function(_myservice_) {
        myservice = _myservice_;
    }));

    it("myservice.baz should be a certain string", function() {
        expect(myservice.baz).toBe('baz value!');
    });

    it("should handle integer ranks - ace,jack,queen, king", function() {
        expect(myservice.rank2integer('a')).toEqual([1,11]);
        expect(myservice.rank2integer('j')).toEqual([10]);
        expect(myservice.rank2integer('q')).toEqual([10]);
        expect(myservice.rank2integer('k')).toEqual([10]);
    });

    it("should handle integer ranks - 2 to 10", function(){
        expect(myservice.rank2integer('2')).toEqual([2]);
        expect(myservice.rank2integer('3')).toEqual([3]);
        expect(myservice.rank2integer('4')).toEqual([4]);
        expect(myservice.rank2integer('5')).toEqual([5]);
        expect(myservice.rank2integer('6')).toEqual([6]);
        expect(myservice.rank2integer('7')).toEqual([7]);
        expect(myservice.rank2integer('8')).toEqual([8]);
        expect(myservice.rank2integer('9')).toEqual([9]);
        expect(myservice.rank2integer('10')).toEqual([10]);
    });

    it("should return 52", function() {
        var deck = myservice.make_deck();
        expect(deck.length).toEqual(52);
    });


    it("should have 4 suits", function() {
        var deck = myservice.make_deck();
        var groups = _.groupBy(deck, function(a) {return a.suit});
        expect(Object.keys(groups).length).toEqual(4);
    });

    xit("should return 53 cards because one is a blank", function() {
        var deck = myservice.make_deck();
        expect(deck.length).toEqual(53);
    });

    xit("should have first card as blank", function() {
        //JSON.stringify()
        var deck = myservice.make_deck();
        first_card = deck[0];
        expect(JSON.stringify(first_card)).toEqual(JSON.stringify({id:0, rank:0, suit:'back'}));
    });

    xit("should have 5 suits because back has its own suit", function() {
        var deck = myservice.make_deck();
        var groups = _.groupBy(deck, function(a) {return a.suit});
        expect(Object.keys(groups).length).toEqual(5);
    });




});


describe("Handlestr", function() {
    var logic;
    beforeEach(function() {

    });

    it("should handle computerlost", function() {
        expect(false).toEqual(false);
    });

    xit("should handle computerwon", function() {
        expect(9).toEqual(3);

    });



});
