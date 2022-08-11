// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const zlib = require("zlib");
const CompressionPlugin = require("compression-webpack-plugin");


const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = MiniCssExtractPlugin.loader;



const config = {
    mode: 'development',
    entry: path.join(__dirname, "/client/src/index.js"),
    output: {
        path: path.resolve(__dirname, 'client/dist'),
        filename: 'bundle.js',
    },
    resolve: {
      fallback: {
        "crypto": false,
        "util": false,
        "http": false,
        "https": false,
        "assert": false,
        "stream": false,
        "zlib": false,
        "os": false,
        "path": false,
        "tls": false,
        "net": false,
        "fs": false
      }
    },
    devtool: "source-map",
    plugins: [
        new webpack.ProvidePlugin({
          process: 'process/browser'
        }),
        new MiniCssExtractPlugin(),
        new CompressionPlugin({
          filename: "[path][base].br",
          algorithm: "brotliCompress",
          test: /\.(js|css|html|svg)$/,
          compressionOptions: {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            },
          },
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                }
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};
