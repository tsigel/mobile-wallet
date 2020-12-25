import React, { FC, useCallback, useEffect, useState } from 'react';
import { Icon, Input, InputProps } from '@ui-kitten/components';
import { Without } from '../../types';
import { ImageProps, TouchableWithoutFeedback } from 'react-native';
import { RenderProp } from '@ui-kitten/components/devsupport';


export const PasswordInput: FC<Props> = (props) => {
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

    const toggleSecureEntry = useCallback(() => {
        setSecureTextEntry(!secureTextEntry);
    }, [secureTextEntry]);

    const PasswordInputIcon: RenderProp<Partial<ImageProps>> = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    return <Input {...props}
                  accessoryRight={PasswordInputIcon}
                  secureTextEntry={secureTextEntry}/>;
};

type Props = Partial<Without<InputProps, 'accessoryRight' | 'secureTextEntry'>>;
