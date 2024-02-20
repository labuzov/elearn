import { create } from 'zustand';


export enum Breakpoints {
    Phone = 576,
    Tablet = 768,
    LandscapeTablet = 992,
    Laptop = 1200,
    LargeLaptop = 9999
}

type AppViewStore = {
    currentBreakpoint: Breakpoints;
    isMenuOpen: boolean;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
    setCurrentBreakpoint: (breakpoint: Breakpoints) => void;
}

export const useAppViewStore = create<AppViewStore>(set => ({
    currentBreakpoint: Breakpoints.LargeLaptop,
    isMenuOpen: false,

    setIsMenuOpen: (isMenuOpen: boolean) => {
        set({ isMenuOpen });
    },

    setCurrentBreakpoint: (breakpoint: Breakpoints) => {
        set({ currentBreakpoint: breakpoint });
    }
}));
