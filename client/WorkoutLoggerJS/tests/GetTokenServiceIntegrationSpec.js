//define(["jquery",
//		"com/jessewarden/workoutlogger/services/GetTokenService",
//		"com/jessewarden/workoutlogger/events/EventBus"], function($, GetTokenService, EventBus)
//{
//	describe("GetTokenService integration test", function()
//	{
//		"use strict";
//
//		var service;
//
//		beforeEach(function()
//		{
//			service = new GetTokenService();
//		});
//
//		afterEach(function()
//		{
//			service = null;
//		});
//
//		it("cow", function()
//		{
//			expect(true).toBe(true);
//		});
//
//		var flag;
//		it("fails to get the token since no local server is running", function()
//		{
//
////			runs(function()
////			{
////				flag = false;
////				var callback = function()
////				{
////					console.log("callback called");
////					flag = true;
////				};
////				EventBus.on("GetTokenService:error", callback);
////				service.getToken();
////			});
////
////			waitsFor(function()
////			{
////				return flag;
////			}, "The Value should be incremented", 3 * 1000);
////
////			runs(function()
////			{
////				expect(flag).toBe(true);
////			});
//
//			runs(function() {
//				flag = false;
//				value = 0;
//
//				setTimeout(function() {
//					flag = true;
//				}, 500);
//			});
//
//			waitsFor(function() {
//				value++;
//				return flag;
//			}, "The Value should be incremented", 750);
//
//			runs(function() {
//				expect(value).toBeGreaterThan(0);
//			});
//		});
//
//
//	});
//});