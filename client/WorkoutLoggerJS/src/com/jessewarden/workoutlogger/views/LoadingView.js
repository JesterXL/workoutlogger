define(["hbs!com/jessewarden/workoutlogger/views/LoadingViewTemplate",
	"underscore",
	"backbone"],
					function(template,
                             _,
                            Backbone)
{
	var LoadingView = Backbone.View.extend({
		tagName: "div",


		initialize: function()
		{
			this.render();
		},

		render: function()
		{
			this.$el.html(template({}));
		}

	});

	return LoadingView;

});
