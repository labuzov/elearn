import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './Container.module.scss';


type ContainerProps = PropsWithChildren & {
    className?: string;
    maxWidth?: number;
}

export const Container: React.FC<ContainerProps> = ({ className, maxWidth, children }) => {

    return ( 
        <div className={classNames(styles.container, className)} style={{ maxWidth }}>
            {children}
        </div>
    );
}
