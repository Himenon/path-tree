/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as express from "express";
import webpack from "webpack";
import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import resolvePkg from "resolve-pkg";

const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const rootPath = path.resolve(__dirname, "./");
const appPath = (nextPath: string) => path.join(rootPath, nextPath);

const pkg = require("./package.json");

const find = (inputPath: string) => {
  const result = resolvePkg(inputPath);
  if (!result) {
    throw new Error(`Not found: ${inputPath}`);
  }
  return result;
};

export const generateConfig = (isProduction: boolean): webpack.Configuration => {
  const isCI = process.env.CI;
  const tsLoader: webpack.RuleSetUse = {
    loader: "ts-loader",
    options: {
      configFile: "tsconfig.json",
      transpileOnly: true,
    },
  };

  const babelLoader: webpack.RuleSetUse = {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      presets: ["@babel/preset-env"],
    },
  };

  return {
    mode: isProduction ? "production" : "development",
    target: "web",
    optimization: {
      minimize: isProduction,
      runtimeChunk: false,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
      splitChunks: {
        chunks: "initial",
        cacheGroups: {
          default: false,
          vendors: false,
          lib: {
            name: "lib",
            chunks: "initial",
            minChunks: 2,
            test: ({ resource: filePath, context: dirPath }, chunk) => {
              return [/src/].some((pattern) => pattern.test(filePath));
            },
            enforce: true,
          },
          vendor: {
            name: "vendor",
            chunks: "initial",
            test: /node_modules/,
            enforce: true,
          },
        },
      },
    },
    entry: {
      application: ["core-js", "regenerator-runtime/runtime", "./src/DevServer.tsx"],
    },
    // @ts-ignore
    devServer: {
      watchContentBase: true,
      contentBase: appPath("public"),
      compress: true,
      port: 9000,
      open: true,
      before: (app: express.Application, _server: any) => {
        app.use("/scripts/vue.js", express.static(find("vue/dist/vue.min.js")));
      },
    },
    devtool: "cheap-source-map",
    plugins: [
      isProduction && !isCI && new BundleAnalyzerPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true }),
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: pkg.name,
        template: "public/index.html",
        Vue: "/scripts/vue.js",
      }),
      new ManifestPlugin(),
    ].filter(Boolean),
    output: {
      filename: "scripts/[name].bundle.js",
      path: appPath("dist"),
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".json"],
      alias: {
        React: appPath("node_modules/react"),
        ReactDOM: appPath("node_modules/react-dom"),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/__tests__/, /node_modules/],
          loaders: [babelLoader, tsLoader],
        },
        {
          test: /\.js$/,
          loader: babelLoader,
        },
      ],
    },
  };
};

export default generateConfig(process.env.NODE_ENV === "production");
