const getIntermediateAndImports = require('can-stache/src/intermediate_and_imports');

const getTemplate = (source, imports) => {
  const requires = imports.map(i => `require('${i}');`).join('\n');

  return `var stache = require('can-stache');
var mustacheCore = require('can-stache/src/mustache_core');
var getIntermediateAndImports = require('can-stache/src/intermediate_and_imports');

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
};

module.exports = function canStacheLoader(source) {
    const src = JSON.stringify(source);
    const intermediateAndImports = getIntermediateAndImports(source);

    return getTemplate(src, intermediateAndImports.imports);
};
