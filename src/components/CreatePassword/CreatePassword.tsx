import React, { FC, useCallback, useEffect, useState } from 'react';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { Row } from '../Row/Row';
import { Text, useTheme } from '@ui-kitten/components';
import { RenderProp } from '@ui-kitten/components/devsupport';
import { TextProps } from '@ui-kitten/components/ui/text/text.component';


export const CreatePassword: FC<Props> = ({ onChange, readonly }) => {
    const theme = useTheme();
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [hasFocusP, setHasFocusP] = useState<boolean>(false);
    const [hasFocusC, setHasFocusC] = useState<boolean>(false);

    const CaptionP: RenderProp<TextProps> = useCallback(({ style, ...props } = {}) => (
        <Text {...props}
              style={[style, { color: (hasFocusP && !password) ? theme['color-danger-400'] : theme['text-hint-color'] }]}>
            Обязательное поле
        </Text>
    ), [hasFocusP, password]);

    const CaptionC: RenderProp<TextProps> = useCallback(({ style, ...props } = {}) => (
        <Text {...props}
              style={[style, { color: hasFocusC && password !== confirm ? theme['color-danger-400'] : theme['text-hint-color'] }]}>
            Пароли должны совпадать
        </Text>
    ), [hasFocusC, password, confirm]);

    useEffect(() => {
        setResult(password === confirm ? password : '');
    }, [password, confirm]);

    useEffect(() => {
        onChange(result);
    }, [result]);

    return (
        <>
            <Row>
                <PasswordInput label='Придумайте пароль'
                               disabled={readonly}
                               onChangeText={setPassword}
                               value={password}
                               placeholder=''
                               onFocus={() => setHasFocusP(true)}
                               caption={CaptionP}/>
            </Row>
            <Row>
                <PasswordInput label='Повторите пароль'
                               disabled={readonly}
                               onChangeText={setConfirm}
                               value={confirm}
                               onFocus={() => setHasFocusC(true)}
                               caption={CaptionC}
                               placeholder=''/>
            </Row>
        </>
    );
};

type Props = {
    onChange: (password: string) => void;
    readonly?: boolean;
};
