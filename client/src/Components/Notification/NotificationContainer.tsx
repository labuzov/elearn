import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const NotificationContainer: FC = () => {
    return <ToastContainer position="bottom-right" />;
}
