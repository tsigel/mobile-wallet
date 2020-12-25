import React, { FC, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { Logo } from '../../components/icons/Logo';
import { Button, Text } from '@ui-kitten/components';
import { Row } from '../../components/Row/Row';
import { Box } from '../../components/Box/Box';
import { CreatePassword } from '../../components/CreatePassword/CreatePassword';
import { AcceptTerms } from '../../components/AcceptTerms/AcceptTerms';

export const Create: FC<Props> = ({ navigation, route }) => {
    const [accepted, setAccepted] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');

    const onContinue = useCallback(() => {
        navigation.replace('CreateSeed', { password });
    }, [password]);

    return (
        <ScreenLayout style={styles.container}>
            <Box alignV={'center'} height={'100%'} h={20}>
                <Row>
                    <Logo/>
                </Row>

                <Row style={{ marginTop: 100 }}>
                    <Text category={'h5'}>
                        Защитите свои аккаунты
                    </Text>
                </Row>
                <Row>
                    <Text appearance='hint' category={'c1'}>
                        Придумйте пароль для своих аккаунтов
                    </Text>
                </Row>

                <CreatePassword onChange={setPassword}/>
                <AcceptTerms onChange={setAccepted}/>

                <Row>
                    <Button style={{ width: '100%', marginTop: 20 }}
                            disabled={!accepted || !password}
                            onPress={onContinue}>
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
        justifyContent: 'center'
    },
    card: {
        borderRadius: 3,
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: '90%',
        backgroundColor: '#eee'
    },
    row: {
        paddingVertical: 10,
    },
    create: {
        paddingTop: 30
    }
});

type Props = {
    navigation: StackNavigationProp<any>;
    route: { params: {} };
}

