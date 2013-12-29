//describe("Simple Test:", function()
//{
//
//	it("a is in fact 'Hello World!' and b to be not null", function()
//	{
//		var a = "Hello World!";
//		var b = true;
//		expect(a).toBe("Hello World!");
////		expect(b).not.toBe(null);
////		console.log("I ran bro.");
//
//
//
//
//	});
//});
//

var assert = require("assert")
describe('Array', function(){
	describe('#indexOf()', function(){
		it('should return -1 when the value is not present', function(){
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
		})
	})
})