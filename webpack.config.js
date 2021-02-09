const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { env } = require("process");

const commonConfig = {
  /* mode: `${env}`, */
  entry: "./src/index.ts",

  plugins: [new webpack.ProgressPlugin()],

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        include: [path.resolve(__dirname, "src")],
        exclude: [/node_modules/],
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  }
};

const developmentConfig = {
  plugins: [new HtmlWebpackPlugin({ template: "index.html" })],

  module: {
    rules: [
      {
        test: /.css$/,

        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",

            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  devServer: {
    open: true,
    host: "localhost",
  }
};

const productionConfig = {

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }

};

module.exports = env => {

    switch (env.NODE_ENV) {
        case "development":
            return merge(commonConfig, developmentConfig);
        case "production":
            return merge(commonConfig, productionConfig);
        default:
            throw new Error("Invalid configuration match. File was not found!");
    }
};  