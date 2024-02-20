import { CSSProperties, FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import { Breakpoints, useAppViewStore } from '@Stores/AppViewStore';
import { Button } from '@Components/Button/Button';

import ResizeSplitter from './ResizeSplitter/ResizeSplitter';
import styles from './MenuPanel.module.scss';
import { Navigation } from './Navigation/Navigation';


const DEFAULT_WIDTH = 250;

type MenuPanelProps = {
}

export const MenuPanel: FC<MenuPanelProps> = () => {
    const { currentBreakpoint, isMenuOpen, setIsMenuOpen } = useAppViewStore(({ currentBreakpoint, isMenuOpen, setIsMenuOpen }) => ({ currentBreakpoint, isMenuOpen, setIsMenuOpen }));

    const [width, setWidth] = useState(DEFAULT_WIDTH);
    const [isSplitterActive, setIsSplitterActive] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        if (currentBreakpoint <= Breakpoints.LandscapeTablet) {
            setIsMobileView(true);
            setIsMenuOpen(false);
        } else {
            setIsMobileView(false);
        }
    }, [currentBreakpoint]);

    const handleChangeWidth = (newWidth: number) => {
        setWidth(newWidth);
    }

    const handleIsSplitterActiveChange = (isActive: boolean) => {
        setIsSplitterActive(isActive);
    }

    const handleBackdropClick = () => {
        setIsMenuOpen(false);
    }

    const getPanelStyle = (): CSSProperties => ({
        width: isMobileView ? 250 : width,
        marginLeft: !isMenuOpen && (isMobileView ? `-250px` : `-${width}px`),
    });

    const getBackdropStyle = (): CSSProperties => ({
        opacity: isMenuOpen ? 1 : 0,
        pointerEvents: isMenuOpen ? 'all' : 'none'
    });

    return (
        <>
            <div 
                className={classNames(styles.panel, isSplitterActive && styles.disableTransition, isMobileView && styles.mobile)}
                style={getPanelStyle()}
            >
                <Navigation />

                {isMenuOpen && (
                    <ResizeSplitter
                        width={width}
                        className={styles.splitter}
                        onChangeWidth={handleChangeWidth}
                        onIsActiveChange={handleIsSplitterActiveChange}
                    />
                )}
            </div>

            {isMobileView && (
                <div
                    className={styles.backdrop}
                    style={getBackdropStyle()}
                    onClick={handleBackdropClick}
                />
            )}
        </>
    );
}
