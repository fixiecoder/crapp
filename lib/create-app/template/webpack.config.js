const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
/*

  requires src structure:

  - src
    - assets
    - html
    - js
    - styles

  dev dependencies:

    - babel-core
    - babel-loader
    - babel-preset-es2015
    - babel-preset-react
    - css-loader
    - extract-text-webpack-plugin
    - file-loader
    - html-webpack-plugin
    - node-sass
    - sass-loader
    - style-loader
    - uglifyjs-webpack-plugin
    - webpack
    - webpack-dev-server

    npm i --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react css-loader extract-text-webpack-plugin file-loader html-webpack-plugin node-sass sass-loader style-loader uglifyjs-webpack-plugin webpack webpack-dev-server

*/

const isProduction = process.env.BUILD_ENV === 'production';
const productionPlugins = isProduction ? [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new UglifyJSPlugin()
] : [];

module.exports = {
  context: __dirname,
  entry: {
    main: './src/js/index',
    vendor: [
      'uuid',
      'react'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-0']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: 'src',
              name: '[path][name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(txt|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: 'src',
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/js/components/'),
      containers: path.resolve(__dirname, 'src/js/containers/'),
      actions: path.resolve(__dirname, 'src/js/actions/'),
      constants: path.resolve(__dirname, 'src/js/constants/'),
      reducers: path.resolve(__dirname, 'src/js/reducers/'),
      middleware: path.resolve(__dirname, 'src/js/middleware/'),
    }
  },

  plugins: [
    new WebpackCleanupPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/html/index.html'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new ExtractTextPlugin('styles.[contenthash].css'),
    ...productionPlugins
  ],

  devtool: isProduction ? false : 'source-map',

  devServer: {
    contentBase: './src',
    port: 3000,
    historyApiFallback: true,
    proxy: {
      'https://k2txetottc.execute-api.eu-west-1.amazonaws.com/prod': {
        target: 'https://k2txetottc.execute-api.eu-west-1.amazonaws.com/dev',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        onProxyRes: (proxyRes, req, res) => {
          console.log(req);
        }
      }
    }
  }
};
