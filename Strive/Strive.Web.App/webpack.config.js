"use strict";
{
  const path = require("path");
  const bundleFolder = "wwwroot/build/";
  const CleanWebpackPlugin = require("clean-webpack-plugin");
  const VueLoaderPlugin = require("vue-loader/lib/plugin");

  module.exports = [
    // app
    {
      entry: { main: "./Scripts/index.js" },
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
    // jQuery
    {
      entry: { jquery: "./node_modules/jquery" },
      mode: "development",
      output: {
        filename: "jquery.js",
        path: path.resolve(__dirname, bundleFolder),
        publicPath: bundleFolder
      },
      plugins: [new CleanWebpackPlugin(bundleFolder)]
    },
    // bootstrap
    {
      entry: { bootstrap: "./node_modules/bootstrap" },
      mode: "development",
      output: {
        filename: "boostrap.js",
        path: path.resolve(__dirname, bundleFolder),
        publicPath: bundleFolder
      },
      plugins: [new CleanWebpackPlugin(bundleFolder)]
    }
  ];
}
