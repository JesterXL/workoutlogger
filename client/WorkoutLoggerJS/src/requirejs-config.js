requirejs.config({
	baseUrl: '',

	paths: {
		"underscore": "../bower_components/underscore/underscore",
		"backbone": "../bower_components/backbone/backbone",
		"jquery": "../bower_components/jquery/jquery",
		"json2": "../bower_components/json2/json2",
		"hbs": "../bower_components/hbs/hbs",
		"moment": "../bower_components/momentjs/moment",
		"cookies": "../bower_components/cookies-js/src/cookies",
		"bootstrap": "../bower_components/bootstrap/dist/js/bootstrap",
		"bootstrapmodal": "../bower_components/bootstrap/js/modal",
		"bootstraptransition": "../bower_components/bootstrap/js/transition"
	},

	shim: {
		'json2': {
			exports: "JSON"
		},
		'underscore': {
			exports: '_'
		},
		'jquery': {
			exports: "$"
		},
		'backbone': {
			exports: "Backbone"
		},
		"bootstrap": {
			deps: ["jquery"]
		},
		"bootstrapmodal":
		{
			deps: ["jquery"]
		},
		"bootstraptransition":
		{
			deps: ["jquery"]
		}
	}
});