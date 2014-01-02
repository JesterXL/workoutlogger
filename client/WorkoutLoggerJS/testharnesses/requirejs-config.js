requirejs.config({
	baseUrl: '../src',

	paths: {
		"underscore": "../bower_components/underscore/underscore",
		"backbone": "../bower_components/backbone/backbone",
		"jquery": "../bower_components/jquery/jquery",
		"json2": "../bower_components/json2/json2",
		"moment": "../bower_components/momentjs/moment"
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
		}
	}
});