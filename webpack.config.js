const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: [
        './src/main.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: "main.bundle.js"
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.m?js$/,
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
    experiments: {
        topLevelAwait: true
    }
};
