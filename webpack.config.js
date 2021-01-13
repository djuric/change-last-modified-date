const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
  ...defaultConfig,
  entry: {
    index: path.resolve(process.cwd(), 'block-editor/src', 'index.js'),
  },
  output: {
    path: path.resolve(process.cwd(), 'block-editor/dist'),
  },
};
