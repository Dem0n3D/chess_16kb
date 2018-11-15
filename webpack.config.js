const PROD = process.env.NODE_ENV === 'production';

const path = require("path");
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    context: __dirname,

    entry: {
        board: [
            './static/board.jsx'
        ],
        auth: [
            './static/auth.js'
        ],
    },

    output: {
        path: path.resolve('./static/bundle'),
        filename: "[name].wp.js"
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].wp.css",
        }),
        new webpack.ProvidePlugin({
            'jQuery': 'jquery',
        })
    ].concat(PROD ? [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false
            }
        })
    ] : [
        // new BundleAnalyzerPlugin({analyzerMode: 'static', openAnalyzer: false}),
    ]),

    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(woff|woff2|ttf|eot)(\?v=(\d+\.?){1,4})?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        name: "./fonts/[hash].[ext]",
                        limit: 10000
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)(\?v=(\d+\.?){1,4})?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: "./images/[hash].[ext]",
                        limit: 10000
                    }
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.mjs'],
        modules: ['node_modules']
    },

    devtool: !PROD ? "source-map" : ""
};
