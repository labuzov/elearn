export type BuildMode = 'production' | 'development';

export type BuildAlias = { [index: string]: string | false | string[] };

export type BuildPaths = {
    entry: string;
    output: string;
    html: string;
    alias?: BuildAlias;
}

export type BuildOptions = {
    port: number;
    paths: BuildPaths;
    mode: BuildMode;
    isAnalyzerVisible?: boolean; 
}
