import { ChangeEvent, FC } from 'react';
import * as Yup from 'yup';

import { useAuthStore } from '@Stores/AuthStore';
import { Container } from '@Components/Container/Container';
import { ContentBlock } from '@Components/ContentBlock/ContentBlock';
import { Label } from '@Components/Label/Label';
import { Input } from '@Components/FormControls/Input/Input';
import { Button } from '@Components/Button/Button';
import { InputPassword } from '@Components/FormControls/InputPassword/InputPassword';
import { Checkbox } from '@Components/FormControls/Checkbox/Checkbox';
import { useLoading } from '@Hooks/loadingHooks';
import { useForm } from '@Hooks/formHooks';

import styles from './LoginPage.module.scss';
import { AppTheme, useAppThemeStore } from '@Stores/AppThemeStore';


const validationSchema = Yup.object().shape({
    login: Yup.string()
        .min(6, 'Минимальное количество символов - 6')
        .max(40, 'Максимальное количество символов - 40')
        .required('Обязательное поле'),
    password: Yup.string()
        .min(6, 'Минимальное количество символов - 6')
        .max(40, 'Максимальное количество символов - 40')
        .required('Обязательное поле'),
    rememberMe: Yup.boolean()
});

type FormValues = Yup.InferType<typeof validationSchema>;

const initialValues: FormValues = {
    login: '',
    password: '',
    rememberMe: false
}

const LoginPage: FC = () => {
    const loginToAccount = useAuthStore(state => state.login);
    const { theme, setTheme } = useAppThemeStore(({ theme, setTheme }) => ({ theme, setTheme }));

    const { isLoading, add } = useLoading();

    const { values, errors, validate, setFieldValue } = useForm<FormValues>({
        initialValues,
        validationSchema,
    })

    const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFieldValue('login', event.currentTarget.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFieldValue('password', event.currentTarget.value);
    }

    const handleRememberMeChange = (value: boolean) => {
        setFieldValue('rememberMe', value);
    }

    const handleSubmit = async () => {
        if (!await validate()) return;

        await add(() => loginToAccount('superkey', values.login,  values.password));
    }

    return (
        <Container maxWidth={500}>

            <div className={styles.logo}>ELearn</div>

            <ContentBlock>
                <div className={styles.title}>Вход в систему</div>
                    <div className={styles.formContainer}>
                    <div className={styles.row}>
                        <Label text='Логин' />
                        <Input
                            value={values.login}
                            errors={errors['login']}
                            onChange={handleLoginChange}
                        />
                    </div>
                    <div className={styles.row}>
                        <Label text='Пароль' />
                        <InputPassword
                            name="password"
                            value={values.password}
                            errors={errors['password']}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className={styles.row}>
                        <Checkbox
                            value={values.rememberMe}
                            onChange={handleRememberMeChange}
                            label="Запомнить меня"
                        />
                    </div>
                    <div className={styles.row}>
                        <Checkbox
                            value={values.rememberMe}
                            onChange={(v) => v ? setTheme(AppTheme.Dark) : setTheme(AppTheme.Default)}
                            label="Dark"
                        />
                    </div>
                    <div className={styles.row}>
                        <Button
                            text="Войти"
                            className={styles.button}
                            isLoading={isLoading}
                            disabled={isLoading}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </ContentBlock>
        </Container>
    )
}

export default LoginPage;
