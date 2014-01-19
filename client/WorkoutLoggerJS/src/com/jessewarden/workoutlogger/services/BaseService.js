define([
	"com/jessewarden/workoutlogger/events/EventBus",
	"com/jessewarden/workoutlogger/factories/ResponseFactory"],
	function(EventBus,
	         ResponseFactory
		)
	{
		var BaseService = _.extend({

			_onSuccess: function(jqueryResponse, successCallback, errorCallback)
			{
				if(ResponseFactory.validResponse(jqueryResponse) == true)
				{
					if(ResponseFactory.needToLogin(jqueryResponse) == true)
					{
//						EventBus.trigger("needToLogin");
					}
					successCallback.call(this, jqueryResponse);
				}
				else
				{
					errorCallback.call(this, jqueryResponse);
				}
			},

			_onError: function(errorStuff, errorCallback)
			{
				if(ResponseFactory.needToLoginError(errorStuff) == true)
				{
//					EventBus.trigger("needToLogin");
				}
				errorCallback.call(this, errorStuff);
			}

		});

		return BaseService;

	});