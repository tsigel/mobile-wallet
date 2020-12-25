import React, { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';


const style = StyleSheet.create({
    row: {
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center',
    }
});

export const Row: FC<Props> = ({ children, ...props }) => (
    <View style={[style.row, props.style]}  {...props}>
        {children}
    </View>
);

type Props = Partial<ViewProps>;
