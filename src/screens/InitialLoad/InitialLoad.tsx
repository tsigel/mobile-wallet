import React, { FC, useEffect } from 'react';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { Box } from '../../components/Box/Box';
import { Row } from '../../components/Row/Row';
import { Logo } from '../../components/icons/Logo';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Spinner } from '@ui-kitten/components';
import { User } from '../../services/User';
import { getGeneralAssets } from '../../services/getGeneralAssets';
import { App } from '../../services/App';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
});

export const InitialLoad: FC<Props> = ({ navigation }) => {
    useEffect(() => {
        Promise
            .all([
                User.hasUsers(),
                getGeneralAssets()
            ])
            .then(([hasUsers, generalAssets]) => {
                App.generalAssets = generalAssets;
                navigation.replace(hasUsers ? 'Login' : 'Create');
            });
    }, []);

    return (
        <ScreenLayout style={styles.container}>
            <Box alignV={'center'} height={'100%'} h={20}>
                <Row style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner size='giant'/>
                </Row>
            </Box>
        </ScreenLayout>
    );
};

type Props = {
    navigation: StackNavigationProp<any>;
}
