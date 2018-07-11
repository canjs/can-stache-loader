var renderer = require('./app.stache');
var partial = require('./partial.stache');
var stache = require('can-stache');

stache.registerPartial( "partial.stache", partial );

document.addEventListener("DOMContentLoaded", function() {
    var frag = renderer({
		message: 'Hello loaders',
		inlineMessage: 'Hello from inline partial'
    })
    document.body.appendChild(frag);
});
