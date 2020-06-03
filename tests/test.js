var QUnit = require("steal-qunit");

var makeIframe = function(src, assert){
	const done = assert.async();
	var iframe = document.createElement('iframe');
	window.assert = assert;
	window.removeMyself = function(){
		delete window.removeMyself;
		document.body.removeChild(iframe);
		done();
	};
	document.body.appendChild(iframe);
	iframe.src = src;
};

QUnit.test("Basics", function(assert) {
	makeIframe(__dirname + "/apps/basics.html?" + Math.random(), assert);
});

QUnit.test("Imports", function(assert) {
	makeIframe(__dirname + "/apps/imports.html?" + Math.random(), assert);
});


QUnit.test("Dynamic imports", function(assert) {
	makeIframe(__dirname + "/apps/dynamic-imports.html?" + Math.random(), assert);
});


QUnit.test("Partials", function(assert) {
	makeIframe(__dirname + "/apps/partials.html?" + Math.random(), assert);
});

QUnit.test("Bindings", function(assert) {
	makeIframe(__dirname + "/apps/bindings.html?" + Math.random(), assert);
});




