var Component = require('can-component');
var tpl = require('./tpl.stache');

Component.extend({
	tag: 'x-comp',
	view: tpl,
	ViewModel: {
		message: {
			type:'string',
			default: 'Hello Imported'
		}
	}
});
