const webpack = require('webpack');
const path = require('path');

const BUILD_DIR= path.resolve(__dirname, 'static/dist/js');    // Build directory
const APP_DIR= path.resolve(__dirname, 'static/src/js');       // Source directory


const webpackConfig = {
	
	entry: {

		script: path.join(APP_DIR, 'app.js'),
	},
	
	output: {
		path: BUILD_DIR,
		filename: '[name].js'
	},

	module: {

		loaders: [
			{
				test: /\.js?/,
				exclude: /node_modules/,
				include: APP_DIR,
				loader: 'babel-loader'
			}
		]
	},

	plugins: [  
		new webpack.ProvidePlugin({
			Promise: 'es6-promise',
			fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		})
	],

	resolve: {
		modules: [
			path.resolve('./node_modules')
		]
	},

	devtool: 'source-map'
};

if(process.argv.includes('-p')) {
	
	webpackConfig.devtool= false;

	webpackConfig.plugins= [
		...webpackConfig.plugins,

		new webpack.optimize.DedupePlugin(),

		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				screw_ie8: true,
				warnings: false
			},
			output: {
				comments: false
			},
			sourceMap: false
		}),
		
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"production"'
			}
		})
	];
}

module.exports = webpackConfig;
