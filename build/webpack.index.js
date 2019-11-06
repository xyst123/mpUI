const merge = require('webpack-merge');
const common = require('./webpack.common');
const { resolve, getConfig } = require('../utils');

const config = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: resolve('lib'),
    publicPath: '/dist/',
    filename: 'index.js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'MP',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  externals: {
    vue: {
      global: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  }
};

const envConfig = getConfig();

module.exports = merge(common, config, envConfig);
