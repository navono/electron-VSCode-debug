const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV === 'development';

let entry = [];
if (dev) {
  entry.push('react-hot-loader/patch');
  entry.push(`webpack-dev-server/client?http://localhost:${PORT}/`);
  entry.push('webpack/hot/only-dev-server');
}
entry.push('./renderer/index');

const devConfig = merge(baseConfig, {
  target: 'electron-renderer',

  mode: dev ? 'development' : 'production',

  devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',

  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    hot: true,
    port: PORT,
    historyApiFallback: true,
    stats: {
      colors: true,
    }
  },

  entry,

  output: {
    path: path.join(__dirname, './dist'),
    publicPath: dev ? `http://localhost:${PORT}/` : '',
    filename: 'renderer.js',
    libraryTarget: 'commonjs2'
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    // dev only
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.LoaderOptionsPlugin({
      debug: dev ? true : false
    }),

    new HtmlWebpackPlugin({
      filename: '../dist/index.html',
      template: './renderer/index.html',
    })
  ]
});

module.exports = devConfig;
