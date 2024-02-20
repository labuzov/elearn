import webpack from 'webpack';
import { BuildOptions } from '../types';


export const getOutput = (options: BuildOptions): webpack.Configuration['output'] => {
    const isDev = options.mode !== 'production';

    return {
        path: options.paths.output,
        filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
        chunkFilename: isDev ? '[name].chunk.js' : '[name].[contenthash:8].chunk.js',
        clean: true
    }
}
