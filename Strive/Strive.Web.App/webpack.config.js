"use strict";
{
  const path = require("path");
  const bundleFolder = "wwwroot/scripts/";
  const CleanWebpackPlugin = require("clean-webpack-plugin");
  const VueLoaderPlugin = require("vue-loader/lib/plugin");
  const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

  module.exports = [
    // application
    {
      entry: { app: "./Scripts/app.js" },
      mode: "development",
      output: {
        filename: "app.js",
        path: path.resolve(__dirname, bundleFolder),
        publicPath: bundleFolder
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: "vue-loader"
          },
          {
            test: /\.css$/,
            use: ["vue-style-loader", "css-loader"]
          }
        ]
      },
      plugins: [new CleanWebpackPlugin([bundleFolder]), new VueLoaderPlugin()]
    },
    // jquery & bootstrap
    {
      entry: {
        jqueryBootstrapBundle: "./Scripts/jquery-bootstrap-bundle.js"
      },
      mode: "development",
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
          })
        ]
      },
      output: {
        filename: "jquery-bootstrap-bundle.min.js",
        path: path.resolve(__dirname, bundleFolder),
        publicPath: bundleFolder
      },
      plugins: [new CleanWebpackPlugin([bundleFolder])]
    }
  ];
}
