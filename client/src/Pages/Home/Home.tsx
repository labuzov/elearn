import { FC, useState } from 'react';
import { MdSend } from 'react-icons/md';

import { useAuthStore } from '@Stores/AuthStore';
import { Container } from '@Components/Container/Container';
import { Button, ButtonType } from '@Components/Button/Button';
import { organizationGet } from '@Api/organizationApi';
import { Label } from '@Components/Label/Label';
import { Input } from '@Components/FormControls/Input/Input';
import { Select } from '@Components/FormControls/Select/Select';

import styles from './Home.module.scss';
import { ContentBlock } from '@Components/ContentBlock/ContentBlock';


const Home: FC = () => {
    const { logout } = useAuthStore(({ logout }) => ({ logout }));

    const [disabled, setDisabled] = useState(false);
    const [loading, setloading] = useState(false);
    const [loginv, setLogin] = useState('System');
    const [password, setPassword] = useState('System');
    const [value, setValue] = useState<number | null>(null);
    const options = [
        {value: 1, label: 'Option 1'},
        {value: 2, label: 'Option 2'},
    ]

    return ( 
        <Container maxWidth={768}>
            <ContentBlock>
                <div className="" style={{ display: 'flex', gap: 16 }}>
                    <Button text='Войти' type={ButtonType.Default} disabled={disabled} Icon={MdSend} isLoading={loading} />
                    <Button text='Выйти' type={ButtonType.Outline} disabled={disabled} Icon={MdSend} isLoading={loading} onClick={() => {
                        logout();
                    }} />
                    <Button text='Организация' type={ButtonType.OutlineSecondary} disabled={disabled} Icon={MdSend}isLoading={loading} onClick={async () => {
                        const { data } = await organizationGet(1000);
                        console.log('org', data)
                    }}/>
                    </div>
                    <div className="" style={{ maxWidth: 200, padding: '24px 50px' }}>
                        <Label text='Логин' />
                        <Input disabled={disabled} value={loginv} onChange={e => setLogin(e.currentTarget.value)} />
                    </div>
                    <div className="" style={{ maxWidth: 200, padding: '0 50px' }}>
                        <Label text='Пароль' />
                        <Input disabled={disabled} value={password} onChange={e => setPassword(e.currentTarget.value)}/>
                    </div>
                    <div className="" style={{ maxWidth: 200, padding: '24px 50px' }}>
                        <Label text='Отчество' />
                        <Select disabled={disabled} isClearable isLoading={loading} options={options} value={value} onChange={v => setValue(+v)} />
                    </div>
                    <div className="" style={{ padding: 50 }}>
                    <Button text='Disabled' type={ButtonType.Outline} onClick={() => setDisabled(!disabled)} />
                    <Button text='Loading' type={ButtonType.Outline} onClick={() => setloading(!loading)} />
                </div>
            </ContentBlock>
        </Container>
    );
}

export default Home;
