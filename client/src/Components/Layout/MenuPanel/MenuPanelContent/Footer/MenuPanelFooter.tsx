import { FC } from 'react';

import styles from './MenuPanelFooter.module.scss';
import { Link } from 'react-router-dom';


export const MenuPanelFooter: FC = () => {

    return (
        <div className={styles.container}>
            <Link to={'/feedback'} className={styles.link}>
                Связаться с нами
            </Link>
            <Link to={'/help'} className={styles.link}>
                Помощь
            </Link>
        </div>
    );
}
