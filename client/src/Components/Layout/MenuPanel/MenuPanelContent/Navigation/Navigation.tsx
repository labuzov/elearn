import { FC, useMemo } from 'react';

import { NavigationItem } from './NavigationItem/NavigationItem';
import { getIcon } from './helpers/navigationHelpers';
import { NavItem } from '../MenuPanelContent';
import styles from './Navigation.module.scss';


type NavigationProps = {
    navItems: NavItem[];
}

export const Navigation: FC<NavigationProps> = ({ navItems }) => {

    const items = useMemo(() => (
        navItems.map((item, index) => {
            const { to, text, icon } = item;

            return (
                <NavigationItem
                    key={index}
                    to={to}
                    text={text}
                    Icon={getIcon(icon)}
                />
            );
        })
    ), [navItems]);

    return (
        <div className={styles.container}>
            {items}
        </div>
    );
}
