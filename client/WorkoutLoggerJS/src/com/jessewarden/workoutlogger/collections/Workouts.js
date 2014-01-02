define([
	"jquery",
	"underscore",
	"backbone",
	"json2",
	"com/jessewarden/workoutlogger/models/Workout",
	"com/jessewarden/workoutlogger/services/ServicesLocator",
	"com/jessewarden/workoutlogger/events/EventBus",
	"moment"], function($,
                        _,
                          Backbone,
                          JSON,
                          Workout,
                          ServicesLocator,
							EventBus,
							moment)
{
	var WorkoutsCollection = Backbone.Collection.extend({

		url: ServicesLocator.WORKOUTS,

		model: Workout,

		parse: function(response)
		{
			try
			{
				console.log("Workouts::parse");
				if(response && response.response == true)
				{
					var modelHashes = [];
					var dataJSON = response.data;
					var data = JSON.parse(dataJSON);
					console.log(data);
					_.each(data, function(modelObject)
					{
						var fields = modelObject.fields;
						var workoutInit = {
							_id: modelObject.pk,
							name: fields.name,
							occurrence: moment(fields.occurrence).toDate(),
							workoutType: null,
							totalTimeInMilliseconds: fields.total_time_in_milliseconds
						};
						modelHashes.push(workoutInit);
					});
					return modelHashes;
				}
				else
				{
					var parseError = (response && response.error) ? response.error : 'parse error';
					EventBus.trigger("Workouts:error", {error: Error(parseError)});
					return null;
				}
			}
			catch(error)
			{
				console.error("WorkoutsCollection::parse:", error);
				EventBus.trigger("Workouts:error", {error: error});
				return null;
			}
		}
	});

	return WorkoutsCollection;

});
