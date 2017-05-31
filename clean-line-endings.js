// Taken from https://github.com/canjs/can-stache/blob/master/src/mustache_core.js

const mustacheLineBreakRegExp = /(?:(?:^|(\r?)\n)(\s*)(\{\{([^\}]*)\}\}\}?)([^\S\n\r]*)($|\r?\n))|(\{\{([^\}]*)\}\}\}?)/g;

/**
 * @hide
 * Returns the mustache mode split from the rest of the expression.
 * @param {can.stache.Expression} expression
 * @param {Object} state The state of HTML where the expression was found.
 */
function splitModeFromExpression(expression, state) {
  expression = expression.trim();
  let mode = expression.charAt(0);

  if ("#/{&^>!".indexOf(mode) >= 0) {
    expression = expression.substr(1).trim();
  } else {
    mode = null;
  }
  // Triple braces do nothing within a tag.
  if (mode === "{" && state.node) {
    mode = null;
  }

  return { mode, expression };
}

/**
 * @hide
 * Prunes line breaks accoding to the mustache specification.
 * @param {String} template
 * @return {String}
 */
module.exports = function cleanLineEndings(template) {
  return template.replace(mustacheLineBreakRegExp, function(
    whole, returnBefore, spaceBefore, special, expression, spaceAfter, returnAfter, spaceLessSpecial,
    spaceLessExpression, matchIndex
  ) {
    spaceAfter = spaceAfter || '';
    returnBefore = returnBefore || '';
    spaceBefore = spaceBefore || '';

    const modeAndExpression = splitModeFromExpression(expression || spaceLessExpression, {});

    if (spaceLessSpecial || '>{'.indexOf(modeAndExpression.mode) >= 0) {
      return whole;
    } else if ('^#!/'.indexOf(modeAndExpression.mode) >= 0) {
      return special + (matchIndex !== 0 && returnAfter.length ? returnBefore + '\n' : '');
    } else {
      return spaceBefore + special + spaceAfter + (spaceBefore.length || matchIndex !== 0 ? returnBefore + '\n' : '');
    }
  });
};
