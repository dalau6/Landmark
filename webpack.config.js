var webpack = require('webpack'); //to access built-in plugins
var path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './public/javascripts/layout.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module:{
    loaders:[{
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ['babel-preset-minify']
        }
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                //require('autoprefixer')
              ];
            }
          }
        //}, {
          //loader: 'sass-loader' // compiles SASS to CSS
        //}, {
          //loader: "less-loader" // compiles Less to CSS
      }]
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      "Tether": 'tether',
      Popper: ['popper.js', 'default'],
    }),
    new UglifyJsPlugin()
  ]
};
