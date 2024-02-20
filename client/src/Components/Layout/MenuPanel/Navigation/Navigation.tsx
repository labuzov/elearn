import { FC, memo, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons';

import styles from './Navigation.module.scss';
import { MdOutlineHome, MdOutlinePeople } from 'react-icons/md';
import { NavigationItem } from './NavigationItem/NavigationItem';
import { OrganizationInfo } from './OrganizationInfo/OrganizationInfo';


type NavItem = {
    to: string;
    text: string;
    Icon: IconType;
}

const navItems: NavItem[] = [
    { text: 'Главная', to: '/', Icon: MdOutlineHome },
    { text: 'Участники', to: '/users', Icon: MdOutlinePeople }
]

type NavigationProps = {
}

export const Navigation: FC<NavigationProps> = memo(() => {
    const items = useMemo(() => (
        navItems.map(item => {
            const { to, text, Icon } = item;

            return (
                <NavigationItem
                    key={to}
                    to={to}
                    text={text}
                    Icon={Icon}
                />
            );
        })
    ), [navItems]);

    return (
        <div className={styles.container}>
            <OrganizationInfo
                title="Название организации"
                info="Какая-то информация про организацию"
                iconLink='https://images.freeimages.com/image/previews/976/thanksgiving-quote-fiesta-5690273.jpg?fmt=webp&h=350'
            />
            <div className={styles.items}>
                {items}
            </div>
            <div className={styles.footer}>
                
            </div>
        </div>
    );
})
