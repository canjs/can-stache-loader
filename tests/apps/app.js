var renderer = require('./app.stache');
var importsRenderer = require('./imports.stache');
var dynamicImportsRenderer = require('./dynamic-imports.stache');
var partialsRenderer = require('./partials.stache');
var {stache, StacheElement} = require('can');
var aPartial = require('./partials/partial.stache');

// basic test
class MyApp extends StacheElement {

	static get view() {
		return renderer
	}

	static get props() {
		return {
			message: { 
				type: String, 
				default: 'Greetings from stache loader'
			}
		};
	}
}

customElements.define('my-app', MyApp);

// import test
class Imports extends StacheElement{
	static get view() { return importsRenderer; }
};

customElements.define('imports-app', Imports);

// dynamic import test
class DynamicImports extends StacheElement {
	static get view() {
		return dynamicImportsRenderer;
	}
};

customElements.define('dynamic-imports-app', DynamicImports);

// partial test
stache.registerPartial('aPartial.stache', aPartial);

class Partials extends StacheElement {
	static get view() { return partialsRenderer; }
};

customElements.define('for-partials', Partials);

class Bindings extends StacheElement {
	static get view() {
		
		return `
			<my-app message:raw="Foo"></my-app>
		`;
	}
}

customElements.define('bindings-app', Bindings);
