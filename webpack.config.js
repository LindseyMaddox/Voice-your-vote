const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: path.join(__dirname, 'src', 'app-client.js'),
  output: {
    path: path.join(__dirname, 'src', 'static', 'js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
      test: /\.js$/,
      exclude: /node_modules/,
      include: path.join(__dirname, 'src'),
       use: [
         {
         loader: 'babel-loader',
         options: {
           cacheDirectory: 'babel_cache',
           presets: [
             'es2015',
             'react'
             ]
         } //options
         } // babel loader
       ] // use
    }] // rules
  } // module
};