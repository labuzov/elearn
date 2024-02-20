import webpack from 'webpack';
import { BuildOptions } from './types';
import { getOptimization } from './parts/optimization.webpack';
import { getPerformance } from './parts/performance.webpack';
import { getDevServer } from './parts/devServer.webpack';
import { getResolve } from './parts/resolve.webpack';
import { getModule } from './parts/module.webpack';
import { getPlugins } from './parts/plugins.webpack';
import { getOutput } from './parts/output.webpack';


export const getWebpackConfig = (options: BuildOptions): webpack.Configuration => {
    const isDev = options.mode !== 'production';

    return {
        mode: options.mode || 'production',
        entry: options.paths.entry,
        output: getOutput(options),
        plugins: getPlugins(options),
        module: getModule(options),
        resolve: getResolve(options),
        devServer: isDev ? getDevServer(options) : undefined,
        performance: getPerformance(options),
        optimization: getOptimization(options),
        devtool: isDev && 'inline-source-map',
    }
}