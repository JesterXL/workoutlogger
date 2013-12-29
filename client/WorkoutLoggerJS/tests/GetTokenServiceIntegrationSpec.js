define(["jquery",
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

		it("cow", function()
		{
			expect(true).toBe(true);
		});

		it("fails to get the token since no local server is running", function()
		{
			var flag;
			var callback = {
				called: false,
				handler: function()
				{
					this.called = true;
					flag = true;
				}
			};
			runs(function()
			{
				flag = false;
				EventBus.on("GetTokenService:error", callback.handler, callback);
				service.getToken();
			});

			waitsFor(function()
			{
				return flag;
			}, "The Value should be incremented", 3 * 1000);

			runs(function()
			{
				expect(callback.called).toBe(true);
			});
		});


	});
});