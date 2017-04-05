"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

// global css
loaders.push({
  test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
  loaders: [
    'style?sourceMap',
    'css'
  ]
});

// local scss modules
loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract(
   '!css!sass!sass-bulk-import'
  )
});

// local css modules
loaders.push({
  test: /[\/\\]src[\/\\].*\.css/,
  loaders: [
    'style?sourceMap',
    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
  ]
});

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
     path.join(__dirname, 'src/index.js')
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'ben mcphail',
    }),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    })
  ]
};
