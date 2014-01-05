define(["jquery",
	"underscore",
	"json2",
	"cookies",
	"com/jessewarden/workoutlogger/services/ServicesLocator",
	"com/jessewarden/workoutlogger/events/EventBus"],
	function($,
	         _,
	         JSON,
	         Cookies,
	         ServicesLocator,
	         EventBus
		)
	{

		function DeleteSetService()
		{
		}

		DeleteSetService.prototype.deleteSet = function(workoutSetID)
		{

			console.log("DeleteSetService::deleteSet, workoutSetID:", workoutSetID);
			var me = this;
			var deleteJSON = {
				setID: workoutSetID
			};
			var headers = {};
			headers["X-CSRFToken"] = Cookies.get("csrftoken");
			headers["Content-Type"] = "text/plain";
			headers["Accept"] = "text/plain";
			$.ajax(
				{
					url: ServicesLocator.DELETE_SET,
					type: "POST",
					data: JSON.stringify(deleteJSON),
					headers: headers,
					success: function(data, dataType, jqXHR)
					{
						me.onSuccess(data);
					},
					error: function(errorStuff)
					{
						me.onError(errorStuff);
					},
					contentType: "application/json"
				});
			return this;
		};

		DeleteSetService.prototype.onSuccess = function(response)
		{
			console.log("DeleteSetService::onSuccess");
			if(response && response.response == true)
			{
				var me = this;
				_.delay(function()
				{
					EventBus.trigger("DeleteSetService:success");
				}, 100);
			}
			else
			{
				this.dispatchError(data.error);
			}
		};

		DeleteSetService.prototype.onError = function(error)
		{
			console.error("DeleteSetService::onError");
			EventBus.trigger("DeleteSetService:error");
			this.dispatchError(error.message);
		};

		DeleteSetService.prototype.dispatchError = function(errorMessage)
		{
//		console.log("DeleteSetService::dispatchError, errorMessage:", errorMessage);
			EventBus.trigger("DeleteSetService:error", {error: Error(errorMessage)});
		};

		return DeleteSetService;

	});