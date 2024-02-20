import { FC, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

import { Input, InputProps } from '../Input/Input';
import styles from './InputPassword.module.scss';


type InputPasswordProps = InputProps;

export const InputPassword: FC<InputPasswordProps> = (props) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleIconClick = () => {
        setIsVisible(!isVisible);
    }

	return (
        <Input
            {...props}
            type={!isVisible ? 'password' : undefined}
            iconClassName={styles.icon}
            Icon={isVisible ? IoMdEyeOff : IoMdEye}
            onIconClick={handleIconClick}
        />
	);
};
