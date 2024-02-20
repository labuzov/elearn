import { FC, memo, useEffect, useState } from 'react';

import { useLoading } from '@Hooks/loadingHooks';

import { OrganizationInfo } from './OrganizationInfo/OrganizationInfo';
import { MenuPanelLoader } from './Loader/MenuPanelLoader';
import { Navigation } from './Navigation/Navigation';
import styles from './MenuPanelContent.module.scss';
import { MenuPanelFooter } from './Footer/MenuPanelFooter';


export enum IconName {
    Home = 'home',
    Users = 'users',
    Tests = 'tests'
}

export type NavItem = {
    to: string;
    text: string;
    icon: IconName;
}

export const MenuPanelContent: FC = memo(() => {
    const [navItems, setNavItems] = useState<NavItem[]>([]);

    const { add, isLoading, isCompletedOnce } = useLoading();

    useEffect(() => {
        add(loadItems);
    }, []);

    const loadItems = async () => {
        const sleep = () => new Promise(r => setTimeout(r, 1000));
        await sleep();

        const mock: NavItem[] = [
            { text: 'Главная', to: '/', icon: IconName.Home },
            { text: 'Участники', to: '/users', icon: IconName.Users },
            { text: 'Тесты', to: '/tests', icon: IconName.Tests },
        ]
        setNavItems(mock);
    }

    if (isLoading || !isCompletedOnce) return <MenuPanelLoader />;

    return (
        <div className={styles.content}>
            <OrganizationInfo
                title="Название организации"
                info="Какая-то информация про организацию"
                iconLink='https://images.freeimages.com/image/previews/976/thanksgiving-quote-fiesta-5690273.jpg?fmt=webp&h=350'
            />
            <Navigation navItems={navItems} />
            <MenuPanelFooter />
        </div>
    );
});
