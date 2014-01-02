define(["underscore",
		"backbone"], function(_,
                               Backbone)
{
	var RememberMeModel = Backbone.Model.extend({

		defaults:
		{
			"rememberMe": false
		},

		sync: function(method, model, options)
		{

		}
	});
	return RememberMeModel;

});
