const path = require("path");
const webpack = require("webpack");

const config = {
  context: __dirname,
  entry: { app: "./src/index.jsx" },
  devtool: "cheap-eval-source-map",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/public/"
  },
  devServer: {
    hot: true,
    publicPath: "/public/",
    historyApiFallback: true
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        enforce: "pre",
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader"
      }
    ]
  },
  mode: "development"
};

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  config.entry = ["./src/index.jsx"];
  config.devtool = false;
  config.plugins = [];
  config.mode = "production";
}

module.exports = config;
