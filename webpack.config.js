var path = require('path');
module.exports = {
	entry: {
		'bundle': "./src/js/index.js",
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: 'build/',
		// publicPath: path.resolve(__dirname),
		filename: "[name].js"
	},
	devServer: {
	  contentBase: path.join(__dirname),
	},
	module: {
		loaders: [
			{
				test: /\.scss/,
				loaders: ['style-loader', 'css-loader', 'sass-loader'],
				include: __dirname + '/src'
			}
		]
  },
};
