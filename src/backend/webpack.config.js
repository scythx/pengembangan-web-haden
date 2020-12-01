const { IgnorePlugin } = require('webpack')
const NodeExternals = require('webpack-node-externals')

module.exports = {
  devtool: 'eval-source-map',
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
    path: __dirname + '/dist',
    filename: "main.bundle.js"
  },
  target: 'node'
}
