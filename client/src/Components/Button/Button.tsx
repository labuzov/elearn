
import classNames from 'classnames';
import { IconType } from 'react-icons';

import { Loading } from '../Loading/Loading';
import styles from './Button.module.scss';


export enum ButtonType {
    Default,
    Outline,
    OutlineSecondary,
}

type ButtonProps = {
    text?: string;
    hint?: string;
    className?: string;
    disabled?: boolean;
    type?: ButtonType;
    isLoading?: boolean;
    Icon?: IconType;
    onClick?: () => Promise<void> | void;
};

export const Button: React.FC<ButtonProps> = ({
    hint, text, className, disabled, type, isLoading, Icon, onClick
}) => {
    const classes = classNames(
        styles.button,
        type === ButtonType.Outline && styles.outline,
        type === ButtonType.OutlineSecondary && styles.outlineSecondary,
        isLoading && styles.loading,
        className
    );

    return (
        <button
            title={hint}
            className={classes}
            disabled={disabled}
            onClick={onClick}
        >
            {Icon && <Icon className={styles.icon} />}
            {text && <div className={styles.text}>{text}</div>}

            {isLoading && (
                <div className={styles.loadingContainer}>
                    <Loading fillContainer className={styles.spinner} />
                </div>
            )}
        </button>
    );
}
