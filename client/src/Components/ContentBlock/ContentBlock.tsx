import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './ContentBlock.module.scss';


type ContentBlockProps = PropsWithChildren & {
    className?: string;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ className, children }) => {

    return ( 
        <div className={classNames(styles.contentBlock, className)}>
            {children}
        </div>
    );
}
