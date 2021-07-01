const path = require("path");
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = env => {
    return {
        mode: env.mode,
        entry: path.resolve(__dirname, "src", "index.js"),
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js",
        },
        devServer: {
            contentBase: path.resolve(__dirname, "dist"),
            historyApiFallback: true,
            clientLogLevel: "silent",
            port: 9000,
            hot: true
        },
        module: {
            rules: [
                {
                    test: /\.(jsx|js)$/,
                    include: path.resolve(__dirname, "src"),
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    [
                                        "@babel/preset-env",
                                        {
                                            targets: "defaults",
                                        },
                                    ],
                                    "@babel/preset-react",
                                ],
                            },
                        },

                    ],
                },
                {
                    test: /\.css$/i,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        'postcss-loader'
                    ]
                }
            ],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].bundle.css',
                chunkFilename: '[id].css'
            }),
            new ESLintPlugin()
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                }),
            ],
        },
    }
};
