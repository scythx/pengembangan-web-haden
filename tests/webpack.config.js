const glob = require('glob')
const nodeExternals = require('webpack-node-externals');

const testFiles =
      glob.sync("tests/**/*.test.js")
          .map((element) => {
              return "./" + element;
          })

module.exports = {
    devtool: 'source-map',
    entry: testFiles,
    experiments: {
        topLevelAwait: true
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
   },
   output: {
        path: __dirname + '/../dist',
        filename: "main.bundle.test.js"
   },
   target: 'node'
};
