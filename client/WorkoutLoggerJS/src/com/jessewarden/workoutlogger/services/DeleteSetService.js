define(["jquery",
	"underscore",
	"json2",
	"cookies",
	"com/jessewarden/workoutlogger/services/ServicesLocator",
	"com/jessewarden/workoutlogger/events/EventBus",
	"com/jessewarden/workoutlogger/services/BaseService"],
	function($,
	         _,
	         JSON,
	         Cookies,
	         ServicesLocator,
	         EventBus,
	         BaseService
		)
	{

		function DeleteSetService()
		{
		}

		DeleteSetService.prototype.deleteSet = function(workoutSetID)
		{
			console.log("DeleteSetService::deleteSet, workoutSetID:", workoutSetID);
			var me = this;
			this.workoutSetID = workoutSetID;
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

		DeleteSetService.prototype.onSuccess = function(response)
		{
			console.log("DeleteSetService::onSuccess");
			if(response && response.response == true)
			{
				var me = this;
				_.delay(function()
				{
					EventBus.trigger("DeleteSetService:success", {workoutSetID: me.workoutSetID});
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

		_.extend(DeleteSetService.prototype, BaseService);

		return DeleteSetService;

	});