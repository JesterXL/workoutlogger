define(["../src/BasicVO"], function(BasicVO)
{
	describe("BasicVO ", function()
	{
		"use strict";
		var basicVO;

		beforeEach(function()
		{
			basicVO = new BasicVO();
		});

		afterEach(function()
		{
			basicVO = null;
		});

		it("not null", function()
		{
			expect(basicVO).not.toBe(null);
		});

	});
});
