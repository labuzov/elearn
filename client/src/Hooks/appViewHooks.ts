import { Breakpoints, useAppViewStore } from '@Stores/AppViewStore';
import { useEffect } from 'react';


export function useAppView() {
    const { setCurrentBreakpoint, setIsMenuOpen } = useAppViewStore.getState();

    useEffect(() => {
        init();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const init = () => {
        const bp = checkWindowBreakpoint(window);
        checkIsMenuOpenByDefault(bp);
    }

    const checkWindowBreakpoint = (windowTarget: Window) => {
        const width = windowTarget.innerWidth;
        let bp = Breakpoints.LargeLaptop;

        if (width <= Breakpoints.Phone) {
            bp = Breakpoints.Phone;
        } else if (width <= Breakpoints.Tablet) {
            bp = Breakpoints.Tablet;
        } else if (width <= Breakpoints.LandscapeTablet) {
            bp = Breakpoints.LandscapeTablet;
        } else if (width <= Breakpoints.Laptop) {
            bp = Breakpoints.Laptop;
        }

        setCurrentBreakpoint(bp);

        return bp;
    }

    const checkIsMenuOpenByDefault = (breakpoint: Breakpoints) => {
        if (breakpoint <= Breakpoints.LandscapeTablet) {
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(true);
        }
    }

    const handleResize = (event: Event) => {
        const window = event.target as Window;
        checkWindowBreakpoint(window);
    }
}
