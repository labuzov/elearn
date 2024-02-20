import webpack from 'webpack';
import { BuildOptions } from '../types';


const DEFAULT_PORT = 3000;

export const getDevServer = (options: BuildOptions): webpack.Configuration['devServer'] => {

    return {
        port: options.port || DEFAULT_PORT,
        open: true,
        historyApiFallback: true,
        client: {
            overlay: false
        }
    }
}
