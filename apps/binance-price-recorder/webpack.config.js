// Helper for combining webpack config objects
const { merge } = require('webpack-merge');
const webpack = require('webpack');

module.exports = (config, _context) => {
  process.env.NODE_CONFIG_DIR = './apps/binance-price-recorder/config';
  const CONFIG = JSON.stringify(require('config'));
  return merge(config, {
    plugins: [new webpack.DefinePlugin({ CONFIG })],
  });
};
