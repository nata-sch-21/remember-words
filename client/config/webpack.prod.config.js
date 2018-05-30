const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pck = require('../package.json');

const { dependencies } = pck;
delete dependencies.express;
delete dependencies.axios;
delete dependencies.fs;

const rootDir = path.resolve(__dirname, '..');

const config = {
  entry: {
    bundle: './src/index.js',
    vendor: Object.keys(dependencies || {}),
  },
  resolve: {
    extensions: ['.js', '.css'],
    modules: [
      path.resolve(rootDir, 'src'),
      'node_modules',
    ],
  },
  output: {
    path: path.resolve(rootDir, 'public'),
    publicPath: '/static',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: [path.resolve(rootDir, 'src')],
        exclude: [path.resolve(rootDir, 'node_modules')],
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        exclude: [path.resolve(rootDir, 'node_modules')],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                minimize: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
              },
            },
          ],
        }),
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      NODE_ENV: JSON.stringify('production'),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(rootDir, 'dist', 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        minimize: true,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      // allChunks: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
  ],
};

module.exports = config;
