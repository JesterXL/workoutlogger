define(["hbs!com/jessewarden/workoutlogger/views/LoadingViewTemplate",
	"underscore",
	"backbone"],
					function(template,
                             _,
                            Backbone)
{
	var LoadingView = Backbone.View.extend({
		tagName: "div",

		render: function()
		{
			this.$el.html(template({}));
		}

	});

	return LoadingView;

});
