define(["underscore", "backbone"], function(_, Backbone)
{
	console.log("underscore:", _);
	console.log("Backbone:", Backbone);
	var EventBus = {};
	_.extend(EventBus, Backbone.Events);
	return EventBus;

});