var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var host = '127.0.0.1';
var port = '8800';

module.exports = {
    //页面入口文件配置
    entry: [
        "babel-polyfill",
        path.resolve(__dirname, "./src/index.js")
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        //加载器配置
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?minimize'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?minimize', 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 2048,
                            name: 'images/[name].[ext]?[hash:8]'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loaders: [
                    {
                        loader: 'babel-loader',
                        query: {
                            // presets: ['es2015']
                            presets: ['env']
                        }
                    },
                    {
                        loader: 'react-svg-loader',
                        query: {
                            jsx: true
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    // presets: ["es2015", "react", "stage-1"]
                    presets: ["env", "react", "stage-1"]
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader?attrs=img:src'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    //插件项
    plugins: [
        // new UglifyJSPlugin(),//取代内置new webpack.optimize.UglifyJsPlugin
        // 单独抽离 CSS
        new ExtractTextPlugin('css/[name].bundle.css'),
        new webpack.HotModuleReplacementPlugin(),
        // JS 压缩插件
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // 生成最终HTML
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            // inject: false,
            // hash: false,
            // minify: {
            //     //移除HTML中的注释
            //     removeComments: true,
            //     //删除空白符与换行符
            //     collapseWhitespace: false
            // }
        })
    ],
    externals: [],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    devtool: 'source-map',
    devServer: {
        host: host,
        port: port,
        // gzip
        compress: true,
        contentBase: path.join(__dirname, "build"),
        hot: true,
        progress: true,
        // 不跳转
        historyApiFallback: false,
        // 实时刷新
        inline: true,
        // 隐藏 webpack 包 bundle 信息，错误和警告仍然会显示。
        noInfo: true
    }
};