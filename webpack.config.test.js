var path = require("path");


module.exports = {
	entry: path.resolve(__dirname, "tests/apps/app.js"),
	output: {
		path: path.resolve(__dirname, 'tests/apps/'),
		filename: "bundle.js"
	},
	mode: "development",
	resolveLoader: {
		modules: [
			'node_modules',
			path.resolve(__dirname, '.')
		]
	},
	module: {
		rules: [{
			test: /\.stache/,
			use: [{
          		loader: path.resolve(__dirname, '.')
        	}]
		}]
	}
};
