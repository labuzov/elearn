import { FC, useEffect, useRef, useState } from 'react';

import styles from './ResizeSplitter.module.scss';
import classNames from 'classnames';


const MIN_WIDTH = 200;
const MAX_WIDTH = 350;

type ResizeSplitterProps = {
    width?: number;
    className?: string;
    onIsActiveChange?: (isActive: boolean) => void;
    onWidthChange: (newWidth: number) => void;
};

const ResizeSplitter: FC<ResizeSplitterProps> = ({ width, className, onIsActiveChange, onWidthChange }) => {
    const splitterXPosition = useRef<number | null>(null);
    const isActive = useRef(false);

    const splitterRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    });

    const handleMouseDown = (event: React.MouseEvent<Element>) => {
        const splitterNode = splitterRef.current;
        if (!splitterNode) return;

        splitterXPosition.current = event.clientX;
        isActive.current = true;

        onIsActiveChange?.(true);
    }

    const handleMouseUp = () => {
        isActive.current = false;
        onIsActiveChange?.(false);
    }

    const handleMouseMove = (e: Event) => {
        if (!isActive.current || !width || !splitterXPosition.current) return;

        e.preventDefault();

        const event = e as unknown as React.MouseEvent<Element>;

        const newWidth = width + event.clientX - splitterXPosition.current;
        splitterXPosition.current = event.clientX;
    
        if (newWidth < MIN_WIDTH) {
            onWidthChange(MIN_WIDTH);
            return;
        }

        if (newWidth > MAX_WIDTH) {
            onWidthChange(MAX_WIDTH);
            return;
        }
    
        onWidthChange(newWidth);
    };

    return (
        <div
            ref={splitterRef}
            className={classNames(styles.splitter, className)}
            onMouseDown={handleMouseDown}
        />
    );
}

export default ResizeSplitter;
