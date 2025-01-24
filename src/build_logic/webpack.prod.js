import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { getProjectDirs } from './locations.js'
import fs from "fs";
import path from "path";

// Dynamically import the common webpack config for the project, depending on the site argument
const site = process.env.SITE;

export async function generateProductionConfig() {
    let common;

    if (site === 'justinholmes.com') {
        common = await import('./webpack.justinholmes.common.js');
    } else if (site === 'cryptograss.live') {
        common = await import('./webpack.cryptograss.common.js');
    } else {
        throw new Error('Invalid site argument');
    }

    const { templateDir, outputDistDir } = getProjectDirs();

    return merge(common['default'], {
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
                        fs.copyFileSync(
                            path.resolve(templateDir, 'shared/.htaccess'),
                            path.resolve(outputDistDir, '.htaccess')
                        );
                        console.log('.htaccess files copied');
                    });
                },
            },
        ], output: {
            filename: '[name].bundle.js',
            path: outputDistDir,
        }
    });
}

export default generateProductionConfig;