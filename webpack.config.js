var path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'public');

var config = {
    entry: APP_DIR + '/js/index.jsx',
    output: {
        path: BUILD_DIR + '/static/js',
        filename: 'bundle.js'
    },
    resolve: {
        root: APP_DIR + '/js',
        extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
    },
    module: {
        loaders : [
            {
                test : /\.jsx?$/,
                include : APP_DIR,
                loader : 'babel-loader',
                excludes: '/node_modules/',
                query: {
                    "presets" : ["es2015", "react"]
                }
            }
        ]
    }
};

module.exports = config;
