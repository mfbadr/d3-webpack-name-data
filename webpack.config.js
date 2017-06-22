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
				test: /\.css/,
				loaders: ['style-loader', 'css-loader'],
				include: __dirname + '/src'
			}
		]
  },
};
