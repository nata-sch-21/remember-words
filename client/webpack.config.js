const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    './src/index.jsx',
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]__[local]___[hash:base64:5]',
              modules: true,
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'styles')],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hotOnly: true, // do not reload if fatal hot: true -> reload
    historyApiFallback: true,
    watchOptions: {
      ignored: [path.resolve(__dirname, 'node_modules')],
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
    new ExtractTextPlugin('style.css'),

    new HtmlWebpackPlugin({
      template: './dist/index.html',
      inject: true,
    }),
  ],
};
