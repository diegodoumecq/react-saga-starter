import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import PostCSSImport from 'postcss-import';
import PostCSSSimpleVars from 'postcss-simple-vars';
import PostCSSFocus from 'postcss-focus';
import PostCSSReporter from 'postcss-reporter';

import Autoprefixer from 'autoprefixer';

const port = 9000;
const bundleFolder = 'build';
const binPath = path.resolve(__dirname, bundleFolder);
const entryPath = path.resolve(__dirname, 'src');

export default {
    devServer: {
        path: binPath,

        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        colors: true,
        port
    },

    devtool: '#source-map',

    entry: [
        //'webpack-dev-server/client?http://localhost:' + port,
        //'webpack/hot/only-dev-server',
        path.resolve(__dirname, 'src/index.jsx')
    ],

    output: {
        path: bundleFolder,
        filename: 'js/bundle.js'
    },

    module: {
        loaders: [{
            test: /\.js[x]?$/,
            loader: 'babel',
            exclude: /(node_modules)/
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader', 'postcss-loader']
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],

    postcss() {
        return [
            PostCSSImport({
                onImport: function (files) {
                    files.forEach(this.addDependency)
                }.bind(this)
            }),
            PostCSSSimpleVars(),
            PostCSSFocus(),
            Autoprefixer({
                browsers: ['last 2 versions', 'IE > 8']
            }),
            PostCSSReporter({
                clearMessages: true
            })
        ];
    },

    target: 'web',

    stats: false,

    progress: true
};
