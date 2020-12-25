import React, { FC, useEffect, useState } from 'react';
import { App } from '../../services/App';
import { Image, StyleSheet, Text, View, ViewProps } from 'react-native';
import { GOOD_COLORS_LIST } from './colors';
import { add, curry, flip, map, mathMod, path, pipe, reduce, split } from 'ramda';
import { toArray } from '../../services/utils';
import { useTheme } from '@ui-kitten/components';
import { loadAssetEffect } from '../../helpers/loadAssetEffect';


const styles = StyleSheet.create({
    box: {
        borderRadius: 100,
        width: 20,
        height: 20,
        alignContent: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 12
    },
    img: {}
});

const charCodeAt = curry((index: number, char: string) =>
    char.charCodeAt(index)
);

export const getAssetLogoBgColor: (id: string) => string = pipe(
    split(''),
    map(charCodeAt(0)),
    reduce<number, number>(add, 0),
    flip(mathMod)(GOOD_COLORS_LIST.length),
    toArray,
    flip(path)(GOOD_COLORS_LIST)
) as any;

export const AssetIcon: FC<Props> = ({ assetId }) => {
    const theme = useTheme();

    if (App.generalAssets[assetId]) {
        return <Image style={styles.box}
                      source={{ uri: App.generalAssets[assetId].icon }}/>;
    }

    const [firstChar, setFirstChar] = useState<string>(' ');

    useEffect(loadAssetEffect([assetId], ([asset]) => {
        setFirstChar(asset.name.charAt(0).toUpperCase());
    }), []);

    return (
        <View style={[styles.box, { backgroundColor: getAssetLogoBgColor(assetId) }]}>
            <Text style={[styles.text, { color: theme['color-basic-100'] }]}>{firstChar}</Text>
        </View>
    );
};

type Props = {
    assetId: string;
};
