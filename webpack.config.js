const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "www"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  mode: "development"
};
