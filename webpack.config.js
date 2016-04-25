'use strict';

// --- PLUGINS ---
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                //path: './scss/',
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("css!sass")
                //loader: "style!css?sourceMap!sass?sourceMap"
            }
        ],
        sassLoader: {
            includePaths: [path.resolve(__dirname, "/bower_components/uikit/scss/")]
        }
    },

    plugins: [
        new ExtractTextPlugin('/public/css/app.css')
    ],

    devtool: NODE_ENV == 'development' ? 'source-map' : null,

    progress: true,
    colors: true,
    //watch: NODE_ENV == 'development',
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },

    displayReasons: true,
    displayErrorDetails: true
}