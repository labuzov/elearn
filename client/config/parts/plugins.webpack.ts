import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import { BuildOptions } from '../types';


export const getPlugins = (options: BuildOptions): webpack.Configuration['plugins'] => {
    const isDev = options.mode !== 'production';

    return [
        new HtmlWebpackPlugin({
            template: options.paths.html
        }),
        new ProgressBarPlugin() as unknown as webpack.ProgressPlugin,
        !isDev && new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        options.isAnalyzerVisible && new BundleAnalyzerPlugin()
    ].filter(Boolean);
}
