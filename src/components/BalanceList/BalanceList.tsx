import React, { FC } from 'react';
import { useTheme } from '@ui-kitten/components';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { Matcher } from '../../services/socket/Matcher';
import { BalanceListItem } from './BalanceListItem';
import { StackNavigationProp } from '@react-navigation/stack';

const styles = StyleSheet.create({
    list: {
    }
});

export const BalanceList: FC<BalanceListProps> = ({ data, navigation }) => {
    const theme = useTheme();

    return <FlatList style={styles.list}
                     removeClippedSubviews={true}
                     updateCellsBatchingPeriod={250}
                     renderItem={
                         (props: ListRenderItemInfo<Matcher.BalanceItem>) => <BalanceListItem
                             navigation={navigation}
                             key={`${props.item.available.toFormat()}-${props.item.asset.id}`}
                             {...props}
                             theme={theme}/>
                     }
                     data={data}/>;
};

export type BalanceListProps = {
    data: Array<Matcher.BalanceItem>;
    navigation: StackNavigationProp<any>;
}
