var renderer = require('./app.stache');
var importsRenderer = require('./imports.stache');
var dynamicImportsRenderer = require('./dynamic-imports.stache');
var partialsRenderer = require('./partials.stache');
var Component = require('can-component');
var stache = require('can-stache');
var aPartial = require('./partials/partial.stache');

// basic test
Component.extend({
	tag: 'my-app',
	view: renderer,
	ViewModel: {
		message: {
			default: function() {
				return 'Greetings from stache loader'
			}
		}
	}
});

// import test
Component.extend({
	tag: "imports-app",
	view: importsRenderer
});

// dynamic import test
Component.extend({
	tag: "dynamic-imports-app",
	view: dynamicImportsRenderer
});

// partial test

stache.registerPartial('aPartial.stache', aPartial);

Component.extend({
	tag: "for-partials",
	view: partialsRenderer
})

