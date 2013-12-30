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

		it("successfully gets the token", function()
		{
			var flag;

			var callback = {
				called: false,
				handleSuccess: function()
				{
					this.called = true;
					flag = true;
				},
				handleError: function()
				{
					expect(true).toBe(false);
				}
			};
			runs(function()
			{
				flag = false;
				EventBus.on("GetTokenService:success", callback.handleSuccess, callback);
				EventBus.on("GetTokenService:error", callback.handleError, callback);
				service.getToken();
			});

			waitsFor(function()
			{
				return flag;
			}, "Failed to get the token", 5 * 1000);

			runs(function()
			{
				expect(callback.called).toBe(true);
				expect(service.token).not.toBe(null);
			});
		});


	});
});