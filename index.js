const getIntermediateAndImports = require('./intermediate_and_imports');
// const getIntermediateAndImports = require('can-stache/src/intermediate_and_imports');
// const getIntermediateAndImports = require('can/dist/cjs/view/stache/intermediate_and_imports');


const getTemplate = (source, imports) => {
  const requires = imports.map(i => `require('${i}');`).join('\n');

  return `var stache = require('can/dist/cjs/view/stache/stache');
var mustacheCore = require('can/dist/cjs/view/stache/mustache_core');
var getIntermediateAndImports = require('can/dist/cjs/view/stache/intermediate_and_imports');

${requires}

var source = ${source};
var intermediateAndImports = getIntermediateAndImports(source);

var intermediate = intermediateAndImports.intermediate;
var renderer = stache(intermediate);

module.exports = function (scope, options, nodeList) {
    var moduleOptions = { module: module };
    
    if (!(options instanceof mustacheCore.Options)) {
        options = new mustacheCore.Options(options || {});
    }
    
    return renderer(scope, options.add(moduleOptions), nodeList);
};`;
}

module.exports = function canStacheLoader(source) {
    const src = JSON.stringify(source);

    const intermediateAndImports = getIntermediateAndImports(source);

    return getTemplate(src, intermediateAndImports.imports);
};
