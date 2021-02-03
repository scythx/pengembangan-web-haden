const path = require('path');
const NodeExternals = require('webpack-node-externals')

module.exports = {
  entry: [
    './src/main.js'
  ],
  externals: [NodeExternals()],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "main.bundle.js"
  },
  target: 'node'
}
