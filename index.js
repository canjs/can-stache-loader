var loaderUtils = require("loader-utils");
var parse = require("can-stache-ast").parse;

function makeRenderer(imports, intermediate, filename){
	intermediate = JSON.stringify(intermediate);
	filename     = JSON.stringify( filename );
	
	var requires =  imports.map(function (imported) {
		return 'require(\'' + imported + '\');';
	}).join('\n');

	return `
		var stache = require('can-stache');
		var mustacheCore = require( "can-stache/src/mustache_core" );
		var parse = require("can-stache-ast").parse;
		//common deps
		require('can-view-import');
		require('can-stache-bindings');
	
		${requires}
		
		${
			filename ? 
			`var renderer = stache(${filename}, ${intermediate})` : 
			`var renderer = stache(${intermediate}) ;`
		}

        module.exports = function(scope, options, nodeList) {
			var moduleOptions = Object.assign({}, options);
			
            if(moduleOptions.helpers) {
                moduleOptions.helpers = Object.assign({ module: module }, moduleOptions.helpers);
            } else {
                moduleOptions.module = module;
			}
            return renderer( scope, moduleOptions, nodeList );
        };
    `;
}

module.exports = function(source, map) {
    var filename = loaderUtils.getRemainingRequest(this);
	var ast = parse(filename, source);
	var callback = this.async();

	Promise.all([
		ast.dynamicImports
	]).then(function(results) {
		var imports = results[0];
		ast.imports.unshift.apply(
			ast.imports, imports
		);
		var renderer = makeRenderer(
			ast.imports,
			ast.intermediate,
			filename
		);
		
		callback(
			null,
			renderer,
			map
		);
	});
};
