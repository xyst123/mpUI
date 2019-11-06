const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const { resolve } = require('./utils');

module.exports = {
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
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        include: resolve('src'),
        exclude: /node_modules/,
      }
    ],
  },
  performance: {
    hints: false,
  },
  optimization: {},
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'test')
    }),
    new VueLoaderPlugin(),
  ],
};
