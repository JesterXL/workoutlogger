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

		xit("successfully logs an existing user out", function()
		{


		});


	});
});