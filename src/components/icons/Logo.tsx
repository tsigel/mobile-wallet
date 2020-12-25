import React, { FC } from 'react';
import { Image, ImageProps, View } from 'react-native';
import { Without } from '../../types';


export const Logo: FC<Props> = (props) => (
    <View>
        <Image height={100}
               {...props}
               source={require('../../images/logo-exchange.png')}/>
    </View>
);

type Props = Partial<Without<ImageProps, 'source'>>;
