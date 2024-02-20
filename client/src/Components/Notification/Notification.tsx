import styles from './Notification.module.scss';

type NotificationProps = {
    title?: string;
    message: string;
}

export const Notification: React.FC<NotificationProps> = ({ title, message }) => {

    return (
        <div className={styles.notificationItem}>
            {title && <div className={styles.title}>{title}</div>}
            <div className={styles.message}>{message}</div>
        </div>
    );
}

