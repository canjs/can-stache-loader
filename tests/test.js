var QUnit = require("steal-qunit");

var makeIframe = function(src){
	var iframe = document.createElement('iframe');
	window.removeMyself = function(){
		delete window.removeMyself;
		document.body.removeChild(iframe);
		done();
	};
	document.body.appendChild(iframe);
	iframe.src = src;
};

QUnit.asyncTest("Basics", function() {
	makeIframe(__dirname + "/apps/basics.html?" + Math.random());
});

QUnit.asyncTest("Imports", function() {
	makeIframe(__dirname + "/apps/imports.html?" + Math.random());
});


QUnit.asyncTest("Dynamic imports", function() {
	makeIframe(__dirname + "/apps/dynamic-imports.html?" + Math.random());
});


QUnit.asyncTest("Partials", function() {
	makeIframe(__dirname + "/apps/partials.html?" + Math.random());
});

QUnit.asyncTest("Bindings", function() {
	makeIframe(__dirname + "/apps/bindings.html?" + Math.random());
});




