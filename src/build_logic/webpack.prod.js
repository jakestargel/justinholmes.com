import jhCommon from './webpack.justinholmes.common.js';
import cgCommon from './webpack.cryptograss.common.js';
import {merge} from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { outputjhcomDistDir, outputcryptograssDistDir, templateDir } from "./constants.js";
import fs from "fs";
import path from "path";

const prodConfig = {
    mode: 'production',
    devtool: false,
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        {
            apply: (compiler) => {
                compiler.hooks.done.tap('CopyHtaccessPlugin', () => {
                    // Copy .htaccess for both sites
                    fs.copyFileSync(
                        path.resolve(templateDir, 'shared/.htaccess'),
                        path.resolve(outputjhcomDistDir, '.htaccess')
                    );
                    fs.copyFileSync(
                        path.resolve(templateDir, 'shared/.htaccess'),
                        path.resolve(outputcryptograssDistDir, '.htaccess')
                    );
                    console.log('.htaccess files copied');
                });
            },
        },
    ]
};

export default [
    merge(jhCommon, {
        ...prodConfig,
        output: {
            filename: '[name].bundle.js',
            path: outputjhcomDistDir,
        }
    }),
    merge(cgCommon, {
        ...prodConfig,
        output: {
            filename: '[name].bundle.js',
            path: outputcryptograssDistDir,
        }
    })
];