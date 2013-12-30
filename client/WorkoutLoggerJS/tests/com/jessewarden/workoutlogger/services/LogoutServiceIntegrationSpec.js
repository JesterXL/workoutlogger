define(["../../../../",
	"unittests/com/jessewarden/workoutlogger/services/LogoutService",
	"unittests/com/jessewarden/workoutlogger/events/EventBus"], function($, LogoutService, EventBus)
{
	describe("LogoutService integration test", function()
	{
		"use strict";

		var logoutService;

		beforeEach(function()
		{
			logoutService = new LogoutService();
		});

		afterEach(function()
		{
			logoutService = null;
		});

		it("successfully logs an existing user out", function()
		{
			var flag;
			var me = this;
			var callback = {
				called: false,
				handleSuccess: function()
				{
					this.called = true;
					flag = true;
				},
				handleError: function()
				{
					me.fail(Error('error handler'));
				}
			};

			runs(function()
			{
				flag = false;
				EventBus.on("LogoutService:success", callback.handleSuccess, callback);
				EventBus.on("LogoutService:error", callback.handleError, callback);
				logoutService.logout();
			});

			waitsFor(function()
			{
				return flag;
			}, "Failed to logout", 1 * 1000);

			runs(function()
			{
				expect(true).toBe(true);
			});

		});


	});
});