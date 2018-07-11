var path = require("path");


module.exports = {
	entry: "./app.js",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "bundle.js"
	},
	mode: "development",
	resolveLoader: {
		modules: [
			'node_modules',
			path.resolve(__dirname, '../')
		]
	},
	module: {
		rules: [{
			test: /\.stache/,
			use: [
        {
          loader: path.resolve('../../')
        }
			]
		}]
	}
};
