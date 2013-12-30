define(["hbs!com/jessewarden/workoutlogger/views/LoginViewTemplate",
		"underscore",
		"backbone",
		"com/jessewarden/workoutlogger/events/EventBus"], function(template,
                              _,
                              Backbone,
								EventBus)
{
	var LoginView = Backbone.View.extend({
		tagName: "div",

		events:
		{
			"click .btn-default":   "onLogin"
		},

		initialize: function()
		{
			this.render();
		},

		render: function()
		{
			this.$el.html(template({}));
		},

		onLogin: function()
		{
			EventBus.trigger("LoginView:login", {
				username: $("#loginViewUsernameInput").value,
				password: $("#loginViewPasswordInput").value
			});
		}

	});
	return LoginView;

});
