const merge = require('webpack-merge');
const common = require('./webpack.common');
const { resolve, getConfig } = require('./utils');

const config = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: resolve('lib'),
    publicPath: '/dist/',
    filename: 'full.js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'MP',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
};

const envConfig = getConfig();

module.exports = merge(common, config, envConfig);
