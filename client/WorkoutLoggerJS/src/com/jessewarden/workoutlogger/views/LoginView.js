define(["hbs!com/jessewarden/workoutlogger/views/LoginViewTemplate",
		"jquery",
		"underscore",
		"backbone",
	"bootstrap",
		"bootstrapmodal",
	"bootstraptransition",
		"com/jessewarden/workoutlogger/events/EventBus"], function(template,
                                                                   $,
                              _,
                              Backbone,
                              bootstrap,
                              bootstrapmodal,
                              bootstraptransition,
								EventBus)
{
	var LoginView = Backbone.View.extend({
		tagName: "div",

		errorObject: null,

		events:
		{
			"click #loginButton":   "onLogin",
			"keyup #loginViewPasswordInput": "onPasswordEnter"
		},

		initialize: function(args)
		{
			this.errorToShow = args.error;
			this.modal = args.modal;
		},

		render: function()
		{
			console.log("LoginView::render");
            try
            {
                var model;
                if(this.errorToShow != null)
                {
                    console.log("this.errorToShow:", this.errorToShow);
                    console.log("this.errorToShow.message:", this.errorToShow.message);
                    model = {error: true, errorMessage: this.errorToShow.message, modal: true};
                }
                else
                {
                    console.log("No error to render.");
                    model = {modal: this.modal};
                }
                console.log("model used to draw:", model);
                console.log("before:", this.$el.html());
                this.$el.html(template(model));
                console.log("after:", this.$el.html());
                $('#loginModal').modal({show: true, backdrop: 'static', keyboard: false});

            }
            catch(error)
            {
                console.error("LoginView::render, error: ", error);
            }
		},

        remove: function()
        {
            console.log("LoginView::remove");
            // Really? REEALLLY?
            $('#loginModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();

            this.$el.remove();
            this.stopListening();
            return this;
        },

		setError: function(errorObject)
		{
			console.log("LoginView::setError, errorObject:", errorObject);
			this.errorToShow = errorObject;
			this.render();
		},

		onLogin: function()
		{
			console.log("LoginView::onLogin");
			var username = $("#loginViewUsernameInput")[0].value;
			var password = $("#loginViewPasswordInput")[0].value;
//			var rememberMeCheckbox = $("#loginViewRememberMeCheckbox")[0];
//			console.log($("#loginViewUsernameInput"));
//			console.log("rememberMe:", rememberMeCheckbox);
//			if(rememberMeCheckbox == true)
//			{
//
//			}

			EventBus.trigger("LoginView:login", {
				username: username,
				password: password
			});
		},

		onPasswordEnter: function(eventObject)
		{
			if(eventObject.keyCode == 13)
			{
				this.onLogin();
			}
		}

	});
	return LoginView;

});
