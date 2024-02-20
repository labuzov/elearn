import webpack from 'webpack';
import { BuildOptions } from '../types';


export const getOptimization = (options: BuildOptions): webpack.Configuration['optimization'] => {
    // const isDev = options.mode !== 'production';

    return {
        splitChunks: {
            chunks: 'all'
        }
    }
}
