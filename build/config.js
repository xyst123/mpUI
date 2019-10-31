const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  test: {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
      new FriendlyErrorsPlugin(),
    ],

  },
  prod: {
    mode: 'production',
    devtool: false,
  }
}
