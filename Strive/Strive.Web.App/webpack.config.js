"use strict";
{
  const path = require("path");
  const bundleFolder = "wwwroot/dist/";
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
  const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

  module.exports = [
    // application
    {
      entry: {
        app: "./Scripts/app.ts",
        login: "./Scripts/views/account/login.ts"
      },
      mode: "development",
      output: {
        filename: "[name].js",
        path: path.resolve(__dirname, bundleFolder),
        publicPath: bundleFolder
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/
          }
        ]
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"]
      }
    },
    // jquery & bootstrap
    {
      entry: {
        jqueryBootstrapBundle: "./Scripts/jquery-bootstrap-bundle.js"
      },
      mode: "production",
      module: {
        rules: [
          {
            test: /\.(scss)$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader"
            ]
          }
        ]
      },
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
      },
      output: {
        filename: "jquery-bootstrap-bundle.min.js",
        path: path.resolve(__dirname, bundleFolder),
        publicPath: bundleFolder
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "jquery-bootstrap-bundle.min.css"
        })
      ]
    }
  ];
}
