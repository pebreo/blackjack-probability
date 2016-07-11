
describe("Basic", function() {
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

    xit("should know a draw", function() {
        expect(false).toBe(true);

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
