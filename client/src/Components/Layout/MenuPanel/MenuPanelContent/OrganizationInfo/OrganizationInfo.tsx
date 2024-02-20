import { FC } from 'react';

import { Avatar } from '@Components/Avatar/Avatar';
import styles from './OrganizationInfo.module.scss';



type OrganizationInfoProps = {
    title: string;
    info?: string;
    iconLink?: string;
}

export const OrganizationInfo: FC<OrganizationInfoProps> = ({ title, info, iconLink }) => {


    return (
        <div className={styles.wrapper}>
            <Avatar
                text="СО"
                src={iconLink}
                className={styles.icon}
                size={40}
            />
            <div className={styles.info}>
                <div className={styles.title}>
                    {title}
                </div>
                {!!info && (
                    <div className={styles.subtitle}>
                        {info}
                    </div>
                )}
            </div>
        </div>
    );
}
