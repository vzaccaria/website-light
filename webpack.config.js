var webpack = require('webpack')
var CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
    plugins: []
}

function getPlugins() {
    if (process.env.PROD == "1") {
        return [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: true
            }),
            new CompressionPlugin({
                asset: "{file}.gz",
                algorithm: "gzip",
                regExp: /\.js$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    } else {
        return []
    }
}

module.exports = {
    entry: './src/js/index.jsx',
    devtool: "source-map",
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    },
    output: {
        path: __dirname + '/assets',
        filename: 'client.js',
        publicPath: 'http://localhost:8080/assets'
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }, {
            test: /\.css$/, // Only .css files
            loader: 'style!css' // Run both loaders
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: getPlugins()
}
