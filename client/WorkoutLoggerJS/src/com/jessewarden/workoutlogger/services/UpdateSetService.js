define(["jquery",
	"underscore",
	"cookies",
	"com/jessewarden/workoutlogger/services/ServicesLocator",
	"com/jessewarden/workoutlogger/events/EventBus",
	"com/jessewarden/workoutlogger/services/BaseService"],
	function($,
	         _,
	         Cookies,
	         ServicesLocator,
	         EventBus,
	         BaseService
		)
	{

		function UpdateSetService()
		{
		}

		UpdateSetService.prototype.updateSet = function(workoutSet)
		{
			console.log("UpdateSetService::updateSet, workoutSet:", workoutSet);
			var me = this;
			var setJSON = workoutSet.toJSON();
			var headers = {};
			headers["X-CSRFToken"] = Cookies.get("csrftoken");
			headers["Content-Type"] = "text/plain";
			headers["Accept"] = "text/plain";
			$.ajax(
				{
					url: ServicesLocator.UPDATE_SET,
					type: "POST",
					data: JSON.stringify(setJSON),
					headers: headers,
					success: function(data, dataType, jqXHR)
					{
						me._onSuccess(data, me.onSuccess, me.onError);
					},
					error: function(errorStuff)
					{
						me._onError(errorStuff, me.onError);
					},
					contentType: "application/json"
				});
			return this;
		};

		UpdateSetService.prototype.onSuccess = function(response)
		{
			console.log("UpdateSetService::onSuccess");
			if(response && response.response == true)
			{
				var me = this;
				_.delay(function()
				{
					EventBus.trigger("UpdateSetService:success");
				}, 100);
			}
			else
			{
				this.dispatchError(data.error);
			}
		};

		UpdateSetService.prototype.onError = function(error)
		{
			console.error("UpdateSetService::onError");
			EventBus.trigger("UpdateSetService:error");
			this.dispatchError(error.message);
		};

		UpdateSetService.prototype.dispatchError = function(errorMessage)
		{
//		console.log("UpdateSetService::dispatchError, errorMessage:", errorMessage);
			EventBus.trigger("UpdateSetService:error", {error: Error(errorMessage)});
		};

		_.extend(UpdateSetService.prototype, BaseService);

		return UpdateSetService;

	});