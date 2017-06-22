const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname+ "/dist",
    filename: 'bundle.js',
  },

  module:{
    loaders: [
      {
        test: /.jsx?$/,
        loader:'babel-loader',
        exclude: '/node_modules/',
        query: {
          presets:['es2015','react']
        }
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }]
      },
    ],
  }
}