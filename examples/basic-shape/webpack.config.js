const path  = require("path")

module.exports = {
  entry: {
    index: path.join(__dirname, "src/index.js"),
  },
  output: {
    filename: "[name].js",
    publicPath: "/",
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
      SvgJelly: path.resolve(__dirname, "../../lib/index.js"),
    },
  },
}

