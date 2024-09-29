const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            publicPath: '/',
            serveIndex: true,
        },
        compress: true,
        port: 8080,
        hot: true,
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/assets/",
                    to: "assets/",
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};

