import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from './Avatar.module.scss';


enum IconStatus {
    None,
    Loaded,
    Error
}

const DEFAULT_SIZE = 36;

type AvatarProps = {
    text?: string;
    src?: string;
    alt?: string;
    size?: number;
    className?: string;
}

export const Avatar: FC<AvatarProps> = ({ text, src, alt, size, className }) => {
    const [status, setStatus] = useState(IconStatus.None);

    const handleLoad = () => {
        setStatus(IconStatus.Loaded);
    }

    const handleError = () => {
        setStatus(IconStatus.Error);
    }

    return (
        <div
            className={classNames(styles.wrapper, className, status === IconStatus.Loaded && styles.loaded)}
            style={{ width: size ?? DEFAULT_SIZE, height: size ?? DEFAULT_SIZE }}
        >
            {!!text && <div className={styles.text}>{text}</div>}
            {!!src && status !== IconStatus.Error && <img src={src} alt={alt} onLoad={handleLoad} onError={handleError} />}
        </div>
    );
}
