const merge = require('webpack-merge');
const common = require('./webpack.common');
const { resolve, getConfig, getExternals } = require('./utils');
const components = require('../components.json');

const componentConfig = {
  entry: components,
  output: {
    path: resolve('lib'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  },
  externals: getExternals(),
};

const envConfig = getConfig();

module.exports = merge(common, componentConfig, envConfig);
