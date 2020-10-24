const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: [
        './tests/main.test.js'
    ],
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
