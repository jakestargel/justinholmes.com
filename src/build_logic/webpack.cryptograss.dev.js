import common from './webpack.cryptograss.common.js';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import path from 'path';
import { getProjectDirs } from './locations.js';

const skipChainData = process.env.SKIP_CHAIN_DATA === 'true';

const devExport = merge(common, {
    devServer: {
        port: 4050,
        historyApiFallback: {
            rewrites: [
                { from: /\/$/, to: '/index.html' },
                {
                    from: /\/(.+)$/, to: function (context) {
                        // Rewrite URLs like '/things' to '/things.html'
                        return '/' + context.match[1] + '.html';
                    }
                },
            ],
        },
        // TODO: Enforce this matching the CopyPlugin
        static: [{
            directory: path.join(getProjectDirs().outputPrimarySiteDir, 'assets'),
            publicPath: '/assets',
        }],
        devMiddleware: {
            writeToDisk: true,
        }
    },
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.SKIP_CHAIN_DATA': JSON.stringify(skipChainData),
        }),
    ]
});

export default devExport;