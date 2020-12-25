import React, { FC } from 'react';
import { FlexStyle, StyleSheet, View, ViewProps } from 'react-native';

const styles = StyleSheet.create({
    box: {
        width: '100%',
    }
});

export const Box: FC<BoxProps> = (props) => (
    <View {...props}
          style={[
              styles.box,
              props.style,
              props.h ? { paddingHorizontal: props.h } : null,
              props.v ? { paddingVertical: props.v } : null,
              props.t ? { paddingTop: props.t } : null,
              props.b ? { paddingBottom: props.b } : null,
              {
                  alignItems: props.alignV,
                  height: props.height,
                  flexDirection: props.d ?? 'column'
              }
          ].filter(Boolean)
          }/>
);

export type BoxProps = {
    h?: number;
    v?: number;
    t?: number;
    b?: number;
    height?: number | string;
    alignV?: FlexStyle['alignItems'];
    alignH?: FlexStyle['alignContent']
    d?: FlexStyle['flexDirection']
} & Partial<ViewProps>;
