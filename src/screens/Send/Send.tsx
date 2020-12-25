import { Alert, Button, Text, TextInput, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { transfer } from '@waves/waves-transactions';
import { api, SEED } from '../../constants';

export const Send = ({ navigation }) => {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState(0);

    const send = useCallback(() => {
        try {
            api.transactions.broadcast(transfer({
                recipient: address,
                amount: Number(amount * Math.pow(10, 8)),
            }, SEED))
                .then((tx) => {
                    navigation.goBack();
                })
                .catch((e) => {
                    Alert.alert(`Error ${e}`);
                });
        } catch (e) {
            Alert.alert(`Error ${e}`);
        }
    }, [address, amount]);

    return (
        <View>
            <TextInput
                onChangeText={setAddress}
                placeholder={'Waves Address'}/>

            <TextInput
                onChangeText={setAmount}
                keyboardType={'numeric'}
                placeholder={'Amount of WAVES'}/>

            <Text>
                Transfer to {address} {amount} WAVES.
            </Text>

            <Button title={'Confirm'} onPress={send}/>
        </View>
    );
};
