const parser = require('can-view-parser');
const cleanLineEndings = require('./clean-line-endings');

module.exports = (source) => {
  const template = cleanLineEndings(source);
  const imports = [];
  const dynamicImports = [];
  const ases = {};

  let inImport = false;
  let inFrom = false;
  let inAs = false;
  let isUnary = false;
  let currentAs = '';
  let currentFrom = '';

  const intermediate = parser(template, {
    start(tagName, unary) {
      isUnary = unary;

      if (tagName === 'can-import') {
        inImport = true;
      } else if (inImport) {
        inImport = false;
      }
    },

    attrStart(attrName) {
      if (attrName === 'from') {
        inFrom = true;
      } else if (attrName === 'as' || attrName === 'export-as') {
        inAs = true;
      }
    },

    attrEnd(attrName) {
      if (attrName === 'from') {
        inFrom = false;
      } else if (attrName === 'as' || attrName === 'export-as') {
        inAs = false;
      }
    },

    attrValue(value) {
      if (inFrom && inImport) {
        imports.push(value);

        if (!isUnary) {
          dynamicImports.push(value);
        }

        currentFrom = value;
      } else if (inAs && inImport) {
        currentAs = value;
      }
    },

    end(tagName) {
      if (tagName === 'can-import') {
        if (currentAs) {
          ases[currentAs] = currentFrom;
          currentAs = '';
        }
      }
    },

    close(tagName) {
      if (tagName === 'can-import') {
        imports.pop();
      }
    }
  }, true);

  return {
    intermediate,
    imports,
    dynamicImports,
    ases,
    exports
  };
};
