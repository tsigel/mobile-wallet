import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { BigNumber } from '@waves/bignumber';
import { Text, TextProps } from '@ui-kitten/components';


const styles = StyleSheet.create({
    box: {
        borderRadius: 100
    },
    icon: {
        width: 20,
        height: 20,
    },
    text: {},
    img: {}
});


export const FormatNumber: FC<Props> = ({ value, ...props }) => (
    <Text {...props}>{value.toFormat()}</Text>
);

type Props = TextProps & {
    value: BigNumber;
}
