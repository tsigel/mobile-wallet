import React, { FC, useCallback, useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Spinner, Text } from '@ui-kitten/components';
import { App } from '../../services/App';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { Row } from '../../components/Row/Row';
import { Logo } from '../../components/icons/Logo';
import { Box } from '../../components/Box/Box';
import { Keyboard, StyleSheet } from 'react-native';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { User } from '../../services/User';
import { ChangeTheme } from '../../components/ChangeTheme/ChangeTheme';

export const Login: FC<Props> = ({ navigation }) => {
    const [password, setPassword] = useState<string>('');
    const [loginApi, setLoginApi] = useState<{ login: (password: string) => boolean }>({ login: () => false });
    const [isValidPassword, setValidPassword] = useState<boolean>(true);
    const [pending, setPending] = useState<boolean>(false);

    useEffect(() => {
        User.getCheckPasswordApi()
            .then((api) => {
                setLoginApi({ login: api });
            });
    }, []);

    const login = useCallback(() => {
        if (pending) {
            return void 0;
        }

        Keyboard.dismiss();
        setPending(true);

        setTimeout(() => {
            const app = loginApi.login(password);
            if (!app) {
                setValidPassword(false);
                setPending(false);
            } else {
                App.login(password).then(() => {
                    navigation.replace('Wallet', {});
                });
            }
        }, 100);
    }, [password, loginApi, pending]);

    const Caption = useCallback(() => (
        !isValidPassword ? (
            <Text status={'danger'}>
                Пароль не правильный!
            </Text>
        ) : <></>
    ), [isValidPassword]);

    return (
        <ScreenLayout style={styles.container}>
            <Box alignV={'center'} height={'100%'} h={20}>

                <Row style={{ marginTop: 100 }}>
                    <Text category={'h5'}>
                        C возвращением
                    </Text>
                </Row>
                <Row>
                    <Text appearance='hint' category={'c1'}>
                        Введите пароль, чтобы продолжить
                    </Text>
                </Row>

                <Row>
                    <PasswordInput label='Пароль'
                                   disabled={pending}
                                   onChangeText={setPassword}
                                   value={password}
                                   caption={Caption}
                                   placeholder=''/>
                </Row>

                <Row>
                    <Text status={'info'} category={'c1'} onPress={() => navigation.replace('Create')}>
                        Забыть аккаунт.
                    </Text>
                </Row>

                <Row>
                    <Button onPress={login}
                            disabled={!password}
                            accessoryLeft={() => pending ? <Spinner status={'warning'} size={'tiny'}/> : <></>}
                            style={{ marginTop: 30, width: '100%' }}>
                        Продолжить
                    </Button>
                </Row>
            </Box>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
});


type Props = {
    navigation: StackNavigationProp<any>;
}
