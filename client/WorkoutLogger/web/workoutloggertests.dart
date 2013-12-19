
import 'dart:async';
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
	
	test("async test", ()
	{
		checkProgress () => expect(true, true);
		new Timer(new Duration(milliseconds:4000), expectAsync0(checkProgress));
	});
  
}