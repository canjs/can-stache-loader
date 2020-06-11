var renderer = require('./imported.stache');
var { StacheElement } = require('can');

class Imported extends StacheElement {
	static get view() { return renderer; }
};

customElements.define('imported-com', Imported);
