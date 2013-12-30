define(["jquery",
	"com/jessewarden/workoutlogger/services/LoginService",
	"com/jessewarden/workoutlogger/services/GetTokenService",
	"com/jessewarden/workoutlogger/services/LogoutService",
	"com/jessewarden/workoutlogger/events/EventBus"], function($, LoginService, GetTokenService, LogoutService, EventBus)
{
	describe("LoginService integration test", function()
	{
		"use strict";

		var loginService;
		var tokenService;
		var logoutService;

		beforeEach(function()
		{
			loginService = new LoginService();
			tokenService = new GetTokenService();
			logoutService = new LogoutService();
		});

		afterEach(function()
		{
			loginService = null;
			tokenService = null;
			logoutService = null;
		});

		it("gets a user upon successfully logging in", function()
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
				EventBus.on("LoginService:success", callback.handleSuccess, callback);
				EventBus.on("LoginService:error", callback.handleError, callback);
				loginService.login("jessewarden", "jessewarden");

			});

			waitsFor(function()
			{
				return flag;
			}, "Failed to get the token", 5 * 1000);

			runs(function()
			{
				expect(callback.called).toBe(true);
				expect(loginService.user).not.toBe(null);
			});

		});


	});
});