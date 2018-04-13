const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  target: 'electron-renderer',

  mode: 'development',

  devtool: 'source-map',

  entry: [
    './renderer/index'
  ],

  output: {
    path: path.join(__dirname, './dist'),
    filename: 'renderer.js',
    libraryTarget: 'commonjs2'
  },

  plugins: [
    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    // https://github.com/webpack/webpack/issues/864
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
});
