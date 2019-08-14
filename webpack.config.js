const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PurifycssPlugin = require('purifycss-webpack');

const website = {
  publicPath: 'http://localhost:1999/',
};

module.exports = {
  mode: 'production',
  devtool: 'eval-source-map',
  entry: {
    app: './src/js/entry.js',
    jquery: 'jquery',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
          publicPath: '../',
        }),
      },
      {
        test: /\.(png|jpe?g|gif)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 244000,
            outputPath: 'images/',
            name: '[name][hash:8].[ext]',
          },
        }],
      },
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: '/node_modules',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack demo',
      hash: true,
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new CleanWebpackPlugin(),
    new ExtractTextPlugin('css/common.css'),
    new PurifycssPlugin({
      paths: glob.sync(path.resolve(__dirname, 'src/*.html')),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        jquery: {
          name: 'jquery',
          chunks: 'initial',
          filename: 'assest/js/[name].js',
        },
      },
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: 'localhost',
    port: '1999',
    compress: true,
  },
};
