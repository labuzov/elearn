import { createElement } from 'react';
import { ToastOptions, toast } from 'react-toastify';

import { Notification } from '@Components/Notification/Notification';


const options: ToastOptions = {
    hideProgressBar: true,
    autoClose: 3000
}

export const showError = (message: string, title?: string) => {
    toast.error(renderNotification(message, title), options);
}

export const showInfo = (message: string, title?: string) => {
    toast.info(renderNotification(message, title), options);
}

export const showWarning = (message: string, title?: string) => {
    toast.warning(renderNotification(message, title), options);
}

export const showSuccess = (message: string, title?: string) => {
    toast.success(renderNotification(message, title), options);
}

export const clearNotifications = () => {
    toast.clearWaitingQueue();
}

const renderNotification = (message: string, title?: string) => {
    const element = createElement(Notification, { title, message });
    return element;
}
