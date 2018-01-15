var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var host = '127.0.0.1';
var port = '8808';

var configDev = {
    context: process.cwd(), // process.cwd()是nodejs的启动目录，确定webpack编译上下文，和其他没有任何关系
    //页面入口文件配置
    entry: [
        "babel-polyfill",
        path.resolve(__dirname, "./pages.src/index.js")
    ],
    // target: 'node',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
        // filename: `[name]${process.env.NODE_ENV === 'production' ? '[chunkhash]' : '[hash]'}.js` // 在配置文件中使用`process.env.NODE_ENV` 安装cross-env --save 处理windows下兼容
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
                loader: 'html-loader?attrs=img:pages.src'
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
        new webpack.ProvidePlugin({//
            'Promise':'es6-promise',
            // 'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
            'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        }),
        // 单独抽离 CSS
        new ExtractTextPlugin('css/[name].bundle.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // 抽取出的模块的模块名
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载  使用process.env.NODE_ENV === 'production' 关闭 HMR 功能,注释此项 相关看[https://segmentfault.com/a/1190000010871559]
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
            inject: 'body',
            // hash: false,
            // minify: {
            //     //移除HTML中的注释
            //     removeComments: true,
            //     //删除空白符与换行符
            //     collapseWhitespace: false
            // }
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
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
        proxy: {
            '/gm/api/*': {
                target: 'http://localhost:9090',
                secure: false
            }
        },
        host: host,
        port: port,
        // gzip
        compress: true,
        contentBase: path.join(__dirname, "public"),//mock数据在哪文件下 也可以是其他文件下 例如path.join(__dirname, "mock")
        watchContentBase: true, //告诉服务器观察devServer.contentBase选项提供的文件。文件更改将触发整页重新加载
        // hot: true, //package.json scripts => satrt => 写了 --hot 此处就不需要写了
        open: true,
        // false不跳转 true 跳转404等页面
        historyApiFallback: true,
        // 实时刷新
        inline: true,
        // 隐藏 webpack 包 bundle 信息，错误和警告仍然会显示。
        noInfo: true,
        stats: 'errors-only' //可以精确地控制显示的包信息
    }
};

module.exports = configDev;