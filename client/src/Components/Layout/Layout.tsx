import { FC, PropsWithChildren, useState } from 'react';

import styles from './Layout.module.scss';
import { Header } from './Header/Header';
import { MenuPanel } from './MenuPanel/MenuPanel';


type LayoutProps = PropsWithChildren & {
    
}

export const Layout: FC<LayoutProps> = ({ children }) => {

    return ( 
        <div className={styles.layout}>
            <Header />
            <div className={styles.container}>
                <MenuPanel />
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}
