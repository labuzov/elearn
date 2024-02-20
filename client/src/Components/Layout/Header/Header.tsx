import { FC, memo } from 'react';

import { useAppViewStore } from '@Stores/AppViewStore';
import styles from './header.module.scss';


type HeaderProps = {
    
}

export const Header: FC<HeaderProps> = memo(({  }) => {
    const { isMenuOpen, setIsMenuOpen } = useAppViewStore(({ isMenuOpen, setIsMenuOpen }) => ({ isMenuOpen, setIsMenuOpen }));

    return ( 
        <header className={styles.header}>
            <div className="" onClick={() => setIsMenuOpen(!isMenuOpen)}>click2</div>
        </header>
    );
})
