"use strict";
{
  const path = require("path");
  const bundleFolder = "wwwroot/build/";
  const CleanWebpackPlugin = require("clean-webpack-plugin");
  const VueLoaderPlugin = require("vue-loader/lib/plugin");

  module.exports = {
    mode: "development",
    entry: { main: "./Scripts/index.js" },
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
  };
}
