import React, { FC, useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Box } from '../../components/Box/Box';
import { Row } from '../../components/Row/Row';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { StyleSheet } from 'react-native';
import { BalanceList } from '../../components/BalanceList/BalanceList';
import { App } from '../../services/App';
import { Spinner } from '@ui-kitten/components';
import { Matcher } from '../../services/socket/Matcher';
import { whereEq } from 'ramda';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
});

export const Wallet: FC<Props> = ({ navigation }) => {
    const [pending, setPending] = useState<boolean>(true);
    const [balances, setBalances] = useState<Array<Matcher.BalanceItem>>([]);

    useEffect(App.user!.balances.makeEffect(({ list, pending }) => {
        setPending(pending);
        setBalances(list.filter(whereEq({ isMain: true })));
    }), []);

    return (
        <ScreenLayout style={styles.container}>
            <Box alignV={'center'} height={'100%'} h={20}>
                <Row>
                    {pending
                        ? (
                            <Box height={'100%'} alignV={'center'} style={{ justifyContent: 'center' }}>
                                <Spinner status={'warning'} size={'large'}/>
                            </Box>
                        )
                        : <BalanceList data={balances} navigation={navigation}/>
                    }
                </Row>
            </Box>
        </ScreenLayout>
    );
};

type Props = {
    navigation: StackNavigationProp<any>;
}
