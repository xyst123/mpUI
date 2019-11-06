const path = require('path');
// const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const components = require('../../components.json');
const config = require('../config/env');

const env = process.env.NODE_ENV || 'test';

function resolve(file) {
  return path.resolve(__dirname, '../../', file);
}

// const mixinsList = fs.readdirSync(resolve('./src/mixins'));

module.exports = {
  resolve,
  getExternals() {
    const externals = {};

    // mixinsList.forEach((file) => {
    //   file = path.basename(file, '.js');
    //   externals[`mp-ui/src/mixins/${file}`] = `mp-ui/dist/mixins/${file}`;
    // });

    Object.keys(components).forEach((key) => {
      externals[`mp-ui/src/components/${key}`] = `mp-ui/dist/${key}`;
    });

    return [externals, nodeExternals()]
  },
  getConfig() {
    return config[env]
  }
}
