const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const paths = {
    dotenv: resolveApp('.env'),
};

const APP = /^CRYPTONOTIF_/i;

module.exports = (env, argv) => {
    dotenv.config({
        path: paths.dotenv,
    });

    const ENV_KEYS = Object.keys(process.env)
        .filter((key) => APP.test(key))
        .reduce(
            (prev, next) => {
                const newEnv = next.replace(APP, '');
                prev[`process.env.${newEnv}`] = JSON.stringify(
                    process.env[next]
                );
                return prev;
            },
            {
                NODE_ENV: process.env.NODE_ENV || 'development',
            }
        );

    return {
        mode: argv.mode || 'development',
        entry: ['babel-polyfill', './src/index.ts'],
        target: 'node',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'index.js',
        },
        resolve: {
            extensions: ['.js', '.ts'],
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        devServer: {
            historyApiFallback: {
                disableDotRule: true,
            },
            quiet: true,
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin(ENV_KEYS),
            new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [
                        'Your application is running here http://localhost:8080',
                    ],
                },
            }),
        ].filter(Boolean),
        devtool: 'inline-source-map',
    };
};
