define(["../../../../",
	"unittests/com/jessewarden/workoutlogger/services/LoginService",
	"unittests/com/jessewarden/workoutlogger/services/GetTokenService",
	"unittests/com/jessewarden/workoutlogger/services/LogoutService",
	"unittests/com/jessewarden/workoutlogger/events/EventBus"], function($, LoginService, GetTokenService, LogoutService, EventBus)
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