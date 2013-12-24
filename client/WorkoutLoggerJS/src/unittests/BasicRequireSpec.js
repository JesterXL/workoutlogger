define(["com/jessewarden/workoutlogger/vo/SetVO"], function(SetVO)
{
	describe("SetVO ", function()
	{
		"use strict";
		var setVO;

		beforeEach(function()
		{
			setVO = new SetVO();
		});

		afterEach(function()
		{
			setVO = null;
		});

		it("not null", function()
		{
			expect(setVO).not.toBe(null);
		});

	});
});
