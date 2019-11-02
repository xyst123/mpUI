const webpack = require('webpack');
const merge = require('webpack-merge');
const { VueLoaderPlugin } = require('vue-loader');
const { resolve, getConfig } = require('../utils');

const config = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: resolve('dist'),
    publicPath: '/dist/',
    filename: 'full.js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'MP',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
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
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                // 使用默认的vue-template-compiler的时候，消除模板标签之间的空格
                preserveWhitespace: false,
              },
            },
          },
          {
            loader: 'style-vw-loader',
            options: {
              unitToConvert: 'px',
              viewportWidth: 375,
              unitPrecision: 3,
              viewportUnit: 'vw',
              fontViewportUnit: 'vw',
              minPixelValue: 1
            }
          },
        ],
        include: resolve('src'),
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve('src'),
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]?[hash]',
          },
        },
        include: [resolve('src/images'), resolve('src/fonts')],
      },
    ],
  },
  performance: {
    // 不展示性能提示（资源过大等）
    hints: false,
  },
  optimization: {},
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'test')
    }),
    new VueLoaderPlugin()
  ],
};

const envConfig = getConfig();

module.exports = merge(config, envConfig);
