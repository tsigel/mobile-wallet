import React, { FC, useCallback, useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Box } from '../../components/Box/Box';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { Button, Input, Spinner, Text } from '@ui-kitten/components';
import { Row } from '../../components/Row/Row';
import { head, pipe, prop } from 'ramda';
import { AssetIcon } from '../../components/AssetIcon/AssetIcon';
import { loadAssetEffect } from '../../helpers/loadAssetEffect';
import { Alert, StyleSheet } from 'react-native';
import { api } from '../../constants';
import { libs, transfer } from '@waves/waves-transactions';
import { App } from '../../services/App';
import { BigNumber } from '@waves/bignumber';

const style = StyleSheet.create({
    row: {
        flexDirection: 'row',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginVertical: 10
    },
    name: {
        marginLeft: 10
    },
    rowControl: {
        marginTop: 30,
        justifyContent: 'space-between'
    },
    button: {
        width: '45%'
    }
});

export const Send: FC<Props> = ({ navigation, route }) => {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [amountModel, setAmountModel] = useState(new BigNumber(0));
    const [name, setName] = useState('');
    const [decimals, setDecimals] = useState(0);
    const [pending, setPending] = useState<boolean>(false);
    const [isValidAddress, setValidAddress] = useState(true);
    const [balance, setBalance] = useState<BigNumber>(new BigNumber(0));

    useEffect(() => {
        if (amount === '') {
            setAmountModel(new BigNumber(0));
        } else {
            setAmountModel(new BigNumber(amount));
        }
    }, [amount]);

    useEffect(App.user!.balances.makeEffect(({ hash }) => {
        setBalance(hash[route.params.assetId].available);
    }), []);

    useEffect(() => {
        if (!address.length) {
            setValidAddress(true);
        } else {
            try {
                setValidAddress(libs.crypto.verifyAddress(address));
            } catch (e) {
                setValidAddress(false);
            }
        }
    }, [address]);

    useEffect(
        loadAssetEffect(
            [route.params.assetId],
            ([asset]) => {
                setName(asset.name);
                setDecimals(asset.precision);
            }
        ),
        []
    );

    const back = useCallback(() => navigation.goBack(), []);

    const send = useCallback(() => {
        try {
            api.transactions.broadcast(transfer({
                recipient: address,
                amount: amountModel.mul(new BigNumber(10).pow(decimals)).toString(),
                feeAssetId: null
            }, App!.user!.seed) as any)
                .then((tx) => {
                    navigation.goBack();
                })
                .catch((e) => {
                    console.log(e);
                    Alert.alert(`Error ${e}`);
                });
        } catch (e) {
            console.log(e);
            Alert.alert(`Error ${e}`);
        }
    }, [address, amountModel]);

    return (
        <ScreenLayout style={{}}>
            <Box height={'100%'} h={20} style={{ paddingTop: 50 }}>
                <Row style={style.row}>
                    <AssetIcon assetId={route.params.assetId}/>
                    <Text style={style.name}>
                        {name}
                    </Text>
                </Row>
                <Row>
                    <Input label={'Waves адрес'}
                           onChangeText={setAddress}
                           status={isValidAddress && address ? 'success' : undefined}
                           value={address}
                           caption={() => (
                               <Text category={'c1'}
                                     appearance={!isValidAddress ? 'default' : 'hint'}
                                     status={!isValidAddress ? 'danger' : undefined}>
                                   {!isValidAddress ? 'Адрес не валиден!' : ''}
                               </Text>
                           )}
                    />
                </Row>
                <Row>
                    <Input label={'Сумма'}
                           onChangeText={setAmount}
                           status={amountModel.gt(0) && balance.gte(amount)  ? 'success' : undefined}
                           keyboardType={'numeric'}
                           value={amount}
                           caption={() => (
                               <Text category={'c1'}
                                     appearance={balance.lt(amount) ? 'default' : 'hint'}
                                     status={balance.lt(amount) ? 'danger' : undefined}>
                                   {balance.lt(amount) ? 'Не достаточно средств!' : `Ваш баланс ${balance.toFormat()}`}
                               </Text>
                           )}

                    />
                </Row>
                <Row style={[style.row, style.rowControl]}>
                    <Button onPress={back}
                            status={'warning'}
                            style={style.button}>
                        Назад
                    </Button>
                    <Button onPress={send}
                            disabled={!address || !amount}
                            accessoryLeft={() => pending ? <Spinner status={'warning'} size={'tiny'}/> : <></>}
                            style={style.button}>
                        Отправить
                    </Button>
                </Row>
            </Box>
        </ScreenLayout>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#292f3c',
//         height: '100%',
//         paddingHorizontal: 20,
//         paddingVertical: 30,
//         alignItems: 'center',
//         color: '#fff'
//     },
// });

type Props = {
    navigation: StackNavigationProp<any>;
    route: {
        params: {
            assetId: string;
        }
    };
}

