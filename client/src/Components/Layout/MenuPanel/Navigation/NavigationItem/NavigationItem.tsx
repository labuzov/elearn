import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

import styles from './NavigationItem.module.scss';


type NavigationItemProps = {
    to: string;
    text: string;
    Icon: IconType;
}

export const NavigationItem: FC<NavigationItemProps> = ({ to, text, Icon }) => {

    return (
        <Link to={to} className={styles.item}>
            <Icon className={styles.icon} />
            <div className={styles.text}>{text}</div>
        </Link>
    );
}
