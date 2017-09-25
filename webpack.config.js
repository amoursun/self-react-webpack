// var webpack = require('webpack');
// var path = require('path');
// var fs = require('fs');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var host = '127.0.0.1';
// var port = '8800';
//
// module.exports = {
//     //页面入口文件配置
//     // entry: [
//     //     "babel-polyfill",
//     //     path.resolve(__dirname, "src/index.js")
//     // ],
//     entry: {
//         index: './src/index.js'
//     },
//     output: {
//         path: path.resolve(__dirname, 'build'),
//         filename: 'bundle.js'
//     },
//     resolve: {
//         extensions: ['', '.js', '.jsx'],
//         // 提高webpack搜索的速度
//         alias: {}
//     },
//     module: {
//         //加载器配置
//         loaders: [
//             {
//                 test: /\.css$/,
//                 loader: 'style-loader!css-loader'
//             },
//             {
//                 test: /\.scss$/,
//                 use: ExtractTextPlugin.extract(
//                     {
//                         fallback: 'style-loader',
//                         use: ['css-loader', 'postcss-loader', 'sass-loader']
//                     }
//                 )
//             },
//             {
//                 test: /\.(png|jpg|gif)$/,
//                 use: [{
//                     loader: 'url-loader',
//                     options: {
//                         limit: 2048,
//                         name: 'images/[name].[ext]?[hash]'
//                     }
//                 }]
//             },
//             {
//                 test: /\.(html)$/,
//                 loader: 'html-loader?attrs=img:src'
//             },
//             {
//                 test: /\.jsx?$/,
//                 loader: 'babel-loader',
//                 exclude: /node_modules/,
//                 query: {
//                     cacheDirectory: true,
//                     presets: ["es2015", "react", "stage-3"]
//                 }
//             },
//             {
//                 test: /\.svg$/,
//                 loaders: [
//                     {
//                         loader: 'babel-loader',
//                         query: {
//                             presets: ['es2015']
//                         }
//                     },
//                     {
//                         loader: 'react-svg-loader',
//                         query: {
//                             jsx: true
//                         }
//                     }
//                 ]
//             },
//             {
//                 test: /\.(js)$/,
//                 exclude: /(node_modules|lib)/,
//                 use: [
//                     "babel-loader",
//                     "eslint-loader"
//                 ],
//             },
//         ]
//     },
//     //插件项
//     plugins: [
//         new UglifyJSPlugin(),
//         new webpack.LoaderOptionsPlugin({
//             options: {
//                 postcss: function () {
//                     return [autoprefixer({
//                         browsers: ['last 2 versions', 'Android >= 4.0'],
//                         //是否美化属性值 默认：true
//                         cascade: true,
//                         //是否去掉不必要的前缀 默认：true
//                         remove: true
//                     })];
//                 }
//             }
//         }),
//         new webpack.HotModuleReplacementPlugin(),
//         // 单独抽离 CSS
//         new ExtractTextPlugin('css/[name].bundle.css'),
//         // 生成最终HTML
//         new HtmlWebpackPlugin({
//             filename: 'index.html',
//             template: './public/index.html',
//             inject: false,
//             hash: true,
//             minify: {
//                 // 移除HTML中的注释
//                 removeComments: true,
//                 // 删除空白符与换行符
//                 collapseWhitespace: false
//             }
//         })
//     ],
//     node: {
//         dgram: 'empty',
//         fs: 'empty',
//         net: 'empty',
//         tls: 'empty',
//         child_process: 'empty',
//     },
//     devtool: 'source-map',
//     devServer: {
//         host: host,
//         port: port,
//         // gzip
//         compress: true,
//         contentBase: path.join(__dirname, "build"),
//         hot: true,
//         progress: true,
//         // 不跳转
//         historyApiFallback: false,
//         // 实时刷新
//         inline: true,
//         // 隐藏 webpack 包 bundle 信息，错误和警告仍然会显示。
//         noInfo: false
//     }
// };
var path = require('path');

module.exports = {
    //页面入口文件配置
    // entry: [
    //     "babel-polyfill",
    //     path.resolve(__dirname, "src/index.js")
    // ],
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        // 提高webpack搜索的速度
        alias: {}
    },
    module: {
        //加载器配置
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader', 'postcss-loader', 'sass-loader']
                    }
                )
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 2048,
                        name: 'images/[name].[ext]?[hash]'
                    }
                }]
            },
            {
                test: /\.(html)$/,
                loader: 'html-loader?attrs=img:src'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ["es2015", "react", "stage-3"]
                }
            },
            {
                test: /\.svg$/,
                loaders: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015']
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
                test: /\.(js)$/,
                exclude: /(node_modules|lib)/,
                use: [
                    "babel-loader",
                    "eslint-loader"
                ],
            },
        ]
    }
};