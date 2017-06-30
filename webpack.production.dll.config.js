const webpack = require('webpack');

const vendors = [
  'antd',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'redux',
  'jquery'
];

module.exports = {
  output: {
    path: 'dist',
    filename: '[name].dll.js',
    library: '[name]_lib'
  },
  entry: {
    vendors: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'production.manifest.json',
      name: '[name]_lib',
      context: __dirname
    })
  ],
};
