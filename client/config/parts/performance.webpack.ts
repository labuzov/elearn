import webpack from 'webpack';
import { BuildOptions } from '../types';


const MB = 1024 * 1024;

export const getPerformance = (options: BuildOptions): webpack.Configuration['performance'] => {

    return {
        maxAssetSize: 10 * MB,
        maxEntrypointSize: 5 * MB
    }
}
