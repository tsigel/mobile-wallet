import React, { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { mergeStyle } from '../../utils/utils';

const styles = StyleSheet.create({
    hr: {
        width: '100%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
});

export const Hr: FC<Props> = (props) => (
    <View {...props} style={mergeStyle(props.style, styles.hr)}/>
);

type Props = Partial<ViewProps>;
