import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';
import classNames from 'classnames';

import styles from './NavigationItem.module.scss';


type NavigationItemProps = {
    to: string;
    text: string;
    Icon: IconType;
}

export const NavigationItem: FC<NavigationItemProps> = ({ to, text, Icon }) => {

    return (
        <NavLink to={to} className={({ isActive }) => classNames(styles.item, isActive && styles.active)}>
            <Icon className={styles.icon} />
            <div className={styles.text}>{text}</div>
        </NavLink>
    );
}
