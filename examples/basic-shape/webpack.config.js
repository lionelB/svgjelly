const path  = require("path")

module.exports = {
  entry: {
    index: path.join(__dirname, "src/index.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      SvgJelly: path.resolve(__dirname, "../../src/index.js"),
    },
  },
}

