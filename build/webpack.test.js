const merge = require('webpack-merge');
const common = require('./webpack.common');
const { resolve, getConfig } = require('../utils');

const config = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: resolve('dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
};

const envConfig = getConfig();

module.exports = merge(common, config, envConfig);
