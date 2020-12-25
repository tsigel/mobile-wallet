import React, { FC, useCallback, useEffect, useState } from 'react';
import { Alert, Keyboard, Linking, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { App } from '../../services/App';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { Logo } from '../../components/icons/Logo';
import { Row } from '../../components/Row/Row';
import { Box } from '../../components/Box/Box';
import { Button, Card, Input, Spinner, Tab, TabView, Text } from '@ui-kitten/components';
import { libs } from '@waves/waves-transactions';

enum Tabs {
    CreateRandom,
    Import
}

const AddressH = () => (
    <Text style={{ paddingVertical: 10, paddingHorizontal: 25 }}>
        Адрес
    </Text>
);

export const CreateSeed: FC<Props> = ({ navigation, route }) => {
    const [tab, setActiveTab] = useState<Tabs>(Tabs.CreateRandom);
    const [randomSeed] = useState(libs.crypto.randomSeed());
    const [imported, setImportedSeed] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);
    const closeKeyboard = useCallback(() => Keyboard.dismiss(), []);
    const [pending, setPending] = useState<boolean>(false);

    useEffect(() => {
        if (tab === Tabs.CreateRandom) {
            setDisabledButton(false);
        } else {
            setDisabledButton(imported.trim() === '');
        }
    }, [tab, imported]);

    const onContinue = useCallback(() => {
        setPending(true);
        const seed = tab === Tabs.Import ? imported.trim() : randomSeed;

        setTimeout(() => {
            App.createUser(route.params.password, seed)
                .then(() => {
                    navigation.replace('Wallet');
                })
                .catch(() => {
                    setPending(false);
                    Alert.alert('Can\'t create user! :(');
                });
        }, 200);
    }, [randomSeed, imported, tab]);

    const openNewAddress = useCallback(() =>
            Linking.openURL(`https://wavesexplorer.com/address/${libs.crypto.address(randomSeed)}`),
        [randomSeed]);

    const openImportedAddress = useCallback(() =>
            Linking.openURL(`https://wavesexplorer.com/address/${libs.crypto.address(imported)}`),
        [imported]);

    const LoadingIndicator = useCallback((props: any) => (
        pending ? <View style={[props.style, styles.indicator]}>
            <Spinner status={'warning'} size='small'/>
        </View> : <></>
    ), [pending]);

    return (
        <ScreenLayout style={styles.container}>
            <Box alignV={'center'} height={'100%'} h={20}>

                <Row>
                    <Logo/>
                </Row>

                <TabView style={{ width: '100%' }} selectedIndex={tab} onSelect={setActiveTab}>
                    <Tab title={'Создать сид'}>
                        <>
                            <Row>
                                <Text style={{ paddingTop: 20 }}>
                                    Новая сид фраза
                                </Text>
                            </Row>
                            <Row>
                                <Card>
                                    <Text>
                                        {randomSeed}
                                    </Text>
                                </Card>
                            </Row>
                            <Row>
                                <Card onPress={closeKeyboard}
                                      style={{ width: '100%' }}
                                      header={AddressH}>
                                    <Text status={'info'}
                                          category={'c1'}
                                          onPress={openNewAddress}>
                                        {libs.crypto.address(randomSeed)}
                                    </Text>
                                </Card>
                            </Row>
                        </>
                    </Tab>
                    <Tab title={'Импорт'}>
                        <>
                            <Row>
                                <Text style={{ paddingTop: 20 }}>
                                    Введите вашу сид фразу
                                </Text>
                            </Row>
                            <Row>
                                <Input multiline={true}
                                       disabled={pending}
                                       onChangeText={setImportedSeed}
                                       textStyle={{ minHeight: 96 }}/>
                            </Row>
                            <Row>
                                <Card onPress={closeKeyboard}
                                      style={{ width: '100%' }}
                                      header={AddressH}>
                                    {
                                        imported.trim() === '' ?
                                            (
                                                <Text status={'warning'}
                                                      category={'c1'}>
                                                    Введите сид фразу
                                                </Text>
                                            ) : (
                                                <Text status={'info'}
                                                      category={'c1'}
                                                      onPress={openImportedAddress}>
                                                    {libs.crypto.address(imported)}
                                                </Text>
                                            )
                                    }
                                </Card>
                            </Row>
                        </>
                    </Tab>
                </TabView>

                <Row>
                    <Button style={{ width: '100%', marginTop: 20 }}
                            onPress={onContinue}
                            disabled={disabledButton}
                            accessoryLeft={LoadingIndicator}>
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
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

type Props = {
    navigation: StackNavigationProp<any>;
    route: {
        params: {
            password: string;
        }
    };
}

