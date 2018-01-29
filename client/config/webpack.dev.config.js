const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(rootDir, 'src', 'index.js'),
  ],
  module: {
    rules: [
      {
        test: /(\.js)$/,
        // test: /\.js$/,
        include: [path.resolve(rootDir, 'src')],
        exclude: [path.resolve(rootDir, 'node_modules')],
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        exclude: [path.resolve(rootDir, 'node_modules')],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]__[local]___[hash:base64:5]',
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(rootDir, 'styles')],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.scss', '.css'],
  },
  output: {
    path: path.join(rootDir, 'dist'),
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
      template: path.resolve(rootDir, 'dist', 'index.html'),
      inject: true,
    }),
  ],
};
