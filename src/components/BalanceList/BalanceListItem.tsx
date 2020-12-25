import React, { FC } from 'react';
import { Button, Icon, Text } from '@ui-kitten/components';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Matcher } from '../../services/socket/Matcher';
import { Box } from '../Box/Box';
import { AssetIcon } from '../AssetIcon/AssetIcon';
import { FormatNumber } from '../FormatNumber/FormatNumber';
import { StackNavigationProp } from '@react-navigation/stack';

const styles = StyleSheet.create({
    list: {
        width: '100%',
        flexDirection: 'row'
    },
    leftContainer: {
        width: '50%',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    rightContainer: {
        width: '50%',
        justifyContent: 'flex-end'
    },
    balance: {
        marginRight: 10,
    },
    iconContainer: {
        flexDirection: 'row'
    },
    assetName: {
        marginLeft: 10
    },
    icon: {
        width: 20,
        height: 20,
    },
});

export const BalanceListItem: FC<BalanceListProps> = ({ item, theme, navigation }) => (
    <View key={`${item.available.toFormat()}-${item.asset.id}-item`} style={styles.list}>
        <View style={styles.leftContainer}>
            <AssetIcon assetId={item.asset.id}/>
            <Text style={styles.assetName}>
                {item.asset.name}
            </Text>
        </View>
        <Box style={styles.rightContainer} d={'row'}
             alignV={'center'}>
            <FormatNumber style={styles.balance} value={item.available}/>

            <View style={styles.iconContainer}>
                <Button appearance={'ghost'}
                        onPress={() => navigation.navigate('Send', { assetId: item.asset.id })}
                        size={'tiny'}
                        accessoryLeft={() => <Icon fill={theme['text-hint-color']}
                                                   style={styles.icon}
                                                   name={'diagonal-arrow-right-up-outline'}/>}/>
                <Button appearance={'ghost'}
                        size={'tiny'}
                        accessoryLeft={() => <Icon fill={theme['text-hint-color']}
                                                   style={styles.icon}
                                                   name={'diagonal-arrow-left-down-outline'}/>}/>
            </View>
        </Box>
    </View>
);

export type BalanceListProps = ListRenderItemInfo<Matcher.BalanceItem> &
    {
        theme: Record<string, string>;
        navigation: StackNavigationProp<any>;
    };
