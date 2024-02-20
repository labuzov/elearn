import { FC } from 'react';

import { Skeleton } from '@Components/Skeleton/Skeleton';
import styles from './MenuPanelLoader.module.scss';


export const MenuPanelLoader: FC = () => {

    return (
        <div className={styles.container}>
            <Skeleton className={styles.item} />
            <Skeleton className={styles.item} />
            <Skeleton className={styles.item} />
            <Skeleton className={styles.item} />
            <Skeleton className={styles.item} />
        </div>
    );
}
