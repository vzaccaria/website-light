var webpack = require('webpack')
var _ = require('lodash')
var CompressionPlugin = require("compression-webpack-plugin");


var uglifier = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    sourceMap: true
})

var compressor = new CompressionPlugin({
    asset: "{file}.gz",
    algorithm: "gzip",
    regExp: /\.js$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
})

function getLoaders() {
    return [{
        test: /\.js[x]?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
    }, {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
    }, {
        test: /\.json/,
        loader: 'json-loader'
    }]
}

var devConfig = {
    output: {
        path: __dirname + '/assets',
        filename: 'client.js',
        publicPath: 'http://localhost:8080/assets'
    },
    devtool: "source-map",
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "site-config": __dirname + "/data/site-dev.json"
        }
    },
    plugins: []

}

var stageConfig = {
    entry: './src/js/index.jsx',
    output: {
        path: __dirname + '/assets',
        filename: 'client.js',
        publicPath: 'http://www.vittoriozaccaria.net/website-light/assets'
    },
    node: {
        __filename: true
    },
    module: {
        loaders: getLoaders()
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "site-config": __dirname + "/data/site-stage.json"
        }
    },
    plugins: [uglifier, compressor]
}

var mainConfig = {
    entry: './src/js/index.jsx',
    output: {
        path: __dirname + '/assets',
        filename: 'client.js',
        publicPath: 'http://www.vittoriozaccaria.net/assets'
    },
    node: {
        __filename: true
    },
    module: {
        loaders: getLoaders()
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "site-config": __dirname + "/data/site.json"
        }
    },
    plugins: [uglifier, compressor]
}

var production = _.get(process.env, "PROD", false);
var stage = _.get(process.env, "STAGE", false);

if (!production && !stage) {
    module.exports = _.assign(mainConfig, devConfig);
    console.log("**DEVELOPMENT BUILD**");
    console.log(JSON.stringify(module.exports, 0, 4));
} else {
    if (production) {
        module.exports = mainConfig
        console.log("**PRODUCTION BUILD**");
        console.log(JSON.stringify(module.exports, 0, 4));
    } else {
        module.exports = _.assign(mainConfig, stageConfig);
        console.log("**STAGE BUILD**");
        console.log(JSON.stringify(module.exports, 0, 4));
    }
}
