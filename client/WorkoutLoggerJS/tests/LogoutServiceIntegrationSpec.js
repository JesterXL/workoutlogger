define(["jquery",
	"com/jessewarden/workoutlogger/services/LogoutService",
	"com/jessewarden/workoutlogger/services/GetTokenService",
	"com/jessewarden/workoutlogger/events/EventBus"], function($, LogoutService, EventBus)
{
	describe("LogoutService integration test", function()
	{
		"use strict";

		var logoutService;
		var tokenService;

		beforeEach(function()
		{
			logoutService = new LogoutService();
			tokenService = new GetTokenService();
		});

		afterEach(function()
		{
			logoutService = null;
			tokenService = null;
		});

		it("successfully logs an existing user out", function()
		{
			var flag;
			var me = this;
			var tokenCallback = {
				called: false,
				handleSuccess: function()
				{
					this.called = true;
					flag = true;
				},
				handleError: function()
				{
					me.fail(Error("token service error"));
				}
			};
			var loginCallback = {
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
				EventBus.on("GetTokenService:success", tokenCallback.handleSuccess, tokenCallback);
				EventBus.on("GetTokenService:error", tokenCallback.handleError, tokenCallback);
				tokenService.getToken();

			});

			waitsFor(function()
			{
				return flag;
			}, "Failed to get token", 1 * 1000);

			runs(function()
			{
				flag = false;
				EventBus.on("LoginService:success", loginCallback.handleSuccess, loginCallback);
				EventBus.on("LoginService:error", loginCallback.handleError, loginCallback);
				loginService.login(tokenService.token, "jessewarden", "jessewarden");
			});

			waitsFor(function()
			{
				return flag;
			}, "Failed to log an existing user out", 5 * 1000);


			runs(function()
			{
				expect(loginCallback.called).toBe(true);
			});

		});


	});
});