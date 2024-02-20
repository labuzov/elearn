import path from 'path';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { getWebpackConfig } from './config/webpackConfig';
import { BuildAlias } from 'config/types';

type WebpackMode = 'production' | 'development';

type EnvVariables = {
    mode?: WebpackMode;
    analyzer?: boolean;
};

export default (env: EnvVariables) => {
    const entryPath = path.resolve(__dirname, 'src', 'index.tsx');
    const outputPath = path.resolve(__dirname, 'build');
    const htmlTemplatePath = path.resolve(__dirname, 'public', 'index.html');

    const aliasPaths: BuildAlias = {
        '@Components': path.resolve(__dirname, 'src', 'Components'),
        '@Hooks': path.resolve(__dirname, 'src', 'Hooks'),
        '@Stores': path.resolve(__dirname, 'src', 'Stores'),
        '@Helpers': path.resolve(__dirname, 'src', 'Helpers'),
        '@Api': path.resolve(__dirname, 'src', 'Api'),
    }

    const config = getWebpackConfig({
        port: 3000,
        mode: env.mode || 'production',
        paths: {
            entry: entryPath,
            output: outputPath,
            html: htmlTemplatePath,
            alias: aliasPaths
        },
        isAnalyzerVisible: env.analyzer
    });

    return config;
}
