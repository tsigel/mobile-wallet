import React, { FC, useEffect, useState } from 'react';
import { Keyboard, Linking, Platform, StyleSheet } from 'react-native';
import { Row } from '../Row/Row';
import { CheckBox, Text } from '@ui-kitten/components';

const openPolicy = () =>
    Linking.openURL('https://waves.exchange/files/Privacy_Policy_Waves.Exchange.pdf');
const openTerms = () =>
    Linking.openURL('https://waves.exchange/files/Terms_Of_Use_Waves.Exchange.pdf');

const styles = StyleSheet.create({
    row: {
        width: '100%',
        paddingVertical: 10,
        flexWrap: 'wrap'
    },
    text: {
        // textAlign: 'justify',
        marginLeft: 10,
        paddingRight: 20
    }
});

export const AcceptTerms: FC<Props> = ({ onChange, readonly }) => {
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
    const [acceptUsage, setAcceptUsage] = useState<boolean>(false);
    const [accepted, setAccepted] = useState<boolean>(acceptTerms && acceptUsage);

    useEffect(() => {
        Keyboard.dismiss();
        setAccepted(acceptTerms && acceptUsage);
    }, [acceptTerms, acceptUsage]);

    useEffect(() => {
        onChange(accepted);
    }, [accepted, onChange]);

    return (
        <>
            <Row style={styles.row}>
                <CheckBox
                    disabled={readonly}
                    onChange={setAcceptTerms} checked={acceptTerms}>{() => (
                    <Text style={styles.text}>
                        Ознакомлен(а) и согласен(сна) с {' '}
                        <Text
                            onPress={openPolicy}
                            status='info'>Политикой конфиденциальности
                        </Text>
                    </Text>
                )}
                </CheckBox>
            </Row>

            <Row style={styles.row}>
                <CheckBox
                    disabled={readonly}
                    onChange={setAcceptUsage} checked={acceptUsage}>{() => (
                    <Text style={styles.text}>
                        Ознакомлен(а) и согласен(сна) с {' '}
                        <Text
                            onPress={openTerms}
                            status='info'>
                            Условиями предоставления услуг
                        </Text>
                    </Text>
                )}
                </CheckBox>
            </Row>
        </>
    );
};

type Props = {
    onChange: (status: boolean) => void;
    readonly?: boolean;
};
