import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Router } from './src/router/Router';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import './src/UserAgent';
import { ThemeMode } from './src/types';
import { App } from './src/services/App';
import { WebViewSocket } from './src/components/WebViewSocket/WebViewSocket';


export default () => {
    const [theme, setTheme] = useState<ThemeMode>('dark');
    useEffect(App.makeEffectChangeTheme(setTheme), []);

    return (
        <>
            <WebViewSocket/>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider {...eva} theme={eva[theme]}>
                <NavigationContainer>
                    <Router/>
                </NavigationContainer>
            </ApplicationProvider>
        </>
    );
}
