const webpack = require('webpack');
const path = require('path');

const BUILD_DIR= path.resolve('./static/dist/js');    // Build directory
const APP_DIR= path.resolve('./static/src/js');       // Source directory


const webpackConfig = {
	
	entry: path.join(APP_DIR, 'app.js'),
	
	output: {
		path: BUILD_DIR,
		filename: 'script.js'
	},

	module: {

		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: { presets: ['es2015', 'stage-0'] }
			}
		]
	},

	plugins: [  
		new webpack.ProvidePlugin({
			Promise: 'es6-promise',
			fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		})
	],

	devtool: 'source-map'
};

if(process.argv.includes('-p')) {

	webpackConfig.devtool= false;

	webpackConfig.plugins= webpackConfig.plugins || [];
	webpackConfig.plugins= webpackConfig.plugins.concat([
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: '"production"' }
		})
	]);
}

module.exports = webpackConfig;
