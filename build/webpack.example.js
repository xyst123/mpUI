const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const vueMarkdownLoaderOptions = require('./config/markdown');
const { resolve } = require('./utils');

const env = process.env.NODE_ENV || 'test';
const isProd = env === 'prod';

const webpackConfig = {
  devtool: isProd ? false : 'source-map',
  mode: isProd ? 'production' : 'development',
  entry: isProd ? {
    docs: './example/main.js',
    'mp-ui': './src/index.js'
  } : './example/main.js',
  output: {
    path: resolve('example/mp-ui/'),
    publicPath: '',
    filename: '[name].[hash:7].js',
    chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js'
  },
  resolve: {
    modules: [resolve('node_modules')],
    extensions: [
      '.js', '.vue', '.json',
    ],
    alias: {
      '@': resolve('src')
    },
  },
  devServer: {
    port: 3004,
    publicPath: '/',
    hot: true
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(vue|jsx?)$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader'
      // },
      {
        test: /\.(jsx?|babel|es6)$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          plugins: [
            'dynamic-import-webpack'
          ]
        },
        include: [resolve('example'), resolve('src')],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        },
        include: [resolve('example'), resolve('src')],
        exclude: /node_modules/,
      },
      {
        test: /\.(less|css)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'less-loader'
        ],
        include: [resolve('example'), resolve('src')],
        exclude: /node_modules/,
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: 'vue-markdown-loader/lib/markdown-compiler',
            options: vueMarkdownLoaderOptions
          }
        ],
        include: resolve('example'),
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        include: [resolve('example'), resolve('src')],
        exclude: /node_modules/,
      }
    ]
  },
  performance: {
    hints: false,
  },
  optimization: {
    minimizer: []
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'test')
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './example/index.tpl',
      filename: './index.html',
      favicon: './example/images/favicon.ico'
    }),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    })
  ]
};

if (isProd) {
  webpackConfig.externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter'
  };
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css'
    })
  );
  webpackConfig.optimization.minimizer.push(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false
    }),
    new OptimizeCSSAssetsPlugin({})
  );
}

module.exports = webpackConfig;
