import { create } from 'zustand';


export const LOCAL_STORAGE_THEME_KEY = 'Theme';

export enum AppTheme {
    Default = 'Default',
    Dark = 'Dark'
}

type AppThemeStore = {
    theme: AppTheme;
    setTheme: (theme: AppTheme) => void;
}

export const useAppThemeStore = create<AppThemeStore>(set => ({
    theme: AppTheme.Default,

    setTheme: (theme: AppTheme) => {
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
        document.body.dataset['theme'] = theme;

        set({ theme });
    }
}));
