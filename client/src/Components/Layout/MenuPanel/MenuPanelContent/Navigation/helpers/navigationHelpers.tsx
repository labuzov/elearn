import { MdEventNote, MdOutlineEventNote, MdOutlineHome, MdOutlinePeople } from 'react-icons/md';


export enum IconName {
    Home = 'home',
    Users = 'users',
    Tests = 'tests'
}

export const getIcon = (iconName: IconName) => {
    switch (iconName) {
        case IconName.Home:
            return MdOutlineHome;
        case IconName.Users:
            return MdOutlinePeople;
        case IconName.Tests:
            return MdEventNote;
        default:
            return null;
    }
}
