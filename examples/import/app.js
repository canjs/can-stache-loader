import renderer from './app.stache';
import partial from './partial.stache';
import {stache} from 'can';

stache.registerPartial( "partial.stache", partial );

document.addEventListener("DOMContentLoaded", function() {
	var frag = renderer({
		message: 'Hello loaders',
		inlineMessage: 'Hello from inline partial'
	});
	document.body.appendChild(frag);
});
