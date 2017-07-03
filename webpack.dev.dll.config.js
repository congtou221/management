const webpack = require('webpack');

const vendors = [
  'antd',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'redux'
];

module.exports = {
  output: {
    path: 'build',
    filename: '[name].dll.js',
    library: '[name]_dev_lib'
  },
  entry: {
    vendors: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'dev.manifest.json',
      name: '[name]_dev_lib',
      context: __dirname
    })
  ]
};
