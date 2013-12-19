
import 'dart:html';
import 'package:unittest/unittest.dart';


void main()
{
  test("testing stuff", () =>
      expect(true, true)
      );
	
	test("another test", ()
	{
		expect(1, 1);
	});
	
	test("third test", ()
	{
		expect(false, false);
	});
  
//  test('callback is executed once', () {
//    // wrap the callback of an asynchronous call with [expectAsync0] if
//    // the callback takes 0 arguments...
//    var timer = Timer.run(expectAsync0(() {
//      int x = 2 + 3;
//      expect(x, equals(5));
//    }));
//  });
//
//  test('callback is executed twice', () {
//    var callback = expectAsync0(() {
//      int x = 2 + 3;
//      expect(x, equals(5));
//    }, count: 2); // <-- we can indicate multiplicity to [expectAsync0]
//    Timer.run(callback);
//    Timer.run(callback);
//  });
}