import { Suspense, lazy, useEffect, useState } from 'react';
import './Styles/App.scss';
import { ErrorBoundary } from './Components/ErrorBoundary/ErrorBoundary';
import { useAuthStore } from './Stores/AuthStore';
import { Loading } from './Components/Loading/Loading';
import { useAppTheme } from '@Hooks/appThemeHooks';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotificationContainer } from '@Components/Notification/NotificationContainer';
import { Layout } from '@Components/Layout/Layout';
import { useAppView } from '@Hooks/appViewHooks';
import { HomeLazy } from './Pages/Home/HomeLazy';

const LoginPage = lazy(() => import('./Pages/Login/LoginPage'));


export const App = () => {
    const { isAuth, refresh } = useAuthStore(({ isAuth, refresh }) => ({ isAuth, refresh }));

    const [isInit, setIsInit] = useState(false);

    useAppTheme();
    useAppView();

    useEffect(() => {
        initApp();
    }, []);

    const initApp = async () => {
        try {
            await refresh();
        } finally {
            setIsInit(true);
        }
    }

    const renderLoginPage = () => {
        return (
            <Suspense fallback={<Loading fillContainer />}>
                <Routes>
                    <Route path="login" element={<LoginPage />} />

                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Suspense>
        );
    }

    const renderApp = () => {
        return (
            <Layout>
                <Routes>
                    <Route path="" index element={<HomeLazy />} />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Layout>
        );
    }

    if (!isInit) return <Loading fillContainer />;

    return (
        <ErrorBoundary>
            <NotificationContainer />
            {!isAuth ? renderLoginPage() : renderApp()}
        </ErrorBoundary>
    )
}
