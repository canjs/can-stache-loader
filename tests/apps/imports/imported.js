var renderer = require('./imported.stache');
var Component = require('can-component');

Component.extend({
	tag: 'imported-com',
	view: renderer
});
