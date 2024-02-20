import webpack from 'webpack';
import { BuildOptions } from '../types';
import path from 'path';


export const getResolve = (options: BuildOptions): webpack.Configuration['resolve'] => {

    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: options.paths.alias
    }
}
