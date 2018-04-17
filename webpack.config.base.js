const path = require('path');

const baseConfig = {
  // absolute path for project root
  context: path.resolve(__dirname, './app'),

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.tsx?$/,
        include: /app/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              plugins: ['react-hot-loader/babel'],
            },
          },
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
};

module.exports = baseConfig;
