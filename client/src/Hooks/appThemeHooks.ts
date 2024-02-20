import { useEffect } from 'react';
import { AppTheme, LOCAL_STORAGE_THEME_KEY, useAppThemeStore } from '@Stores/AppThemeStore';


export function useAppTheme() {
    const { setTheme } = useAppThemeStore.getState();

    useEffect(() => {
        initTheme();

        // window.matchMedia('(prefers-color-scheme: dark)')
        //     .addEventListener('change', handleSystemThemeChange);

        // return () => {
        //     window.matchMedia('(prefers-color-scheme: dark)')
        //         .removeEventListener('change', handleSystemThemeChange);
        // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initTheme = () => {
        const localStorageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as AppTheme;

        if (localStorageTheme) {
            setTheme(localStorageTheme);

            return;
        }

        // setTheme(getSystemTheme());
    }

    const getSystemTheme = () => {
        const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
        const isDarkMode = darkThemeMq.matches;

        if (isDarkMode) return AppTheme.Dark;
        
        return AppTheme.Default;
    }

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
        const isDarkMode = event.matches;

        if (isDarkMode) {
            setTheme(AppTheme.Dark);

            return;
        }

        setTheme(AppTheme.Default);
    }
}
