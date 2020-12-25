import React, { FC } from 'react';
import { Keyboard, Platform, SafeAreaView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';
import { LayoutProps } from '@ui-kitten/components/ui/layout/layout.component';
import { Logo } from '../icons/Logo';
import { ChangeTheme } from '../ChangeTheme/ChangeTheme';
import { Box } from '../Box/Box';

const styles = StyleSheet.create({
    layout: {
        height: '100%',
    },
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        width: '100%'
    }
});

const getJustifyContentContent = (mode: 'center' | 'left' | 'right' = 'center') => {
    switch (mode) {
        case 'center':
            return 'center';
        case 'left':
            return 'flex-start';
        case 'right':
            return 'flex-end';
    }
};

const closeKeyboard = () => Keyboard.dismiss();

export const ScreenLayout: FC<Props> = ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
        <Layout style={[styles.layout, props.style]}>
            <SafeAreaView style={[styles.safeArea, { alignItems: getJustifyContentContent(props.mode) }]}>
                <Box style={{ justifyContent: 'space-between' }} h={20} v={10} d={'row'}>
                    <Logo/>
                    <ChangeTheme />
                </Box>
                {children}
            </SafeAreaView>
        </Layout>
    </TouchableWithoutFeedback>
);

type Props = Partial<LayoutProps> & {
    mode?: 'center' | 'left' | 'right'
};
