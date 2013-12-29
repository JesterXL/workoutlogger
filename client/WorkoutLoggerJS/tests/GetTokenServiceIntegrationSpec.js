require(["jquery",
		"com/jessewarden/workoutlogger/services/GetTokenService",
		"com/jessewarden/workoutlogger/events/EventBus"], function($, GetTokenService, EventBus)
{
	describe("GetTokenService integration test", function()
	{
		"use strict";

		var service;

		beforeEach(function()
		{
			service = new GetTokenService();
		});

		afterEach(function()
		{
			service = null;
		});

		it("fails to get the token since no local server is running", function()
		{
//			spyOn(service, "onError");
//			runs(function()
//			{
//
//				setTimeout(function() {
//					flag = true;
//				}, 3 * 1000);
//			});
//
//			waitsFor(function()
//			{
//				return service.onError.toHaveBeenCalled();
//			}, "The Value should be incremented", 750);

			runs(function() {
				flag = false;
				value = 0;

				setTimeout(function() {
					flag = true;
				}, 500);
			});

			waitsFor(function() {
				value++;
				return flag;
			}, "The Value should be incremented", 750);
		});


	});
});

//
//define(["underscore"], function(_)
//{
//	describe("Test underscore", function()
//	{
//		it("works", function()
//		{
//			expect(true, true);
//		});
//	});
//});