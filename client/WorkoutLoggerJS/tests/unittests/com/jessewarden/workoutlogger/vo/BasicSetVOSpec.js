define(["com/jessewarden/workoutlogger/vo/SetVO"], function(SetVO)
{
	describe("SetVO ", function()
	{
		"use strict";
		var setVO;

		it("name equals constructor param", function()
		{
			var testName = "test";
			setVO = new SetVO(testName);
			expect(setVO.name).toBe(testName);
		});


	});
});
