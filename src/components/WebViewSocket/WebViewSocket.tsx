import WebView from 'react-native-webview';
import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { template } from './socketTemplate';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';
import { App } from '../../services/App';

const style = StyleSheet.create({
    container: {
        width: 0,
        height: 0,
        position: 'absolute',
        zIndex: -1,
        top: '-100%',
        display: 'none',
        backgroundColor: 'transparent'
    }
});

export const WebViewSocket = () => {
    const webViewRef = useRef<WebView>(null);
    const emitter = App.getPrivateEmitter();

    useEffect(() => {
        if (!webViewRef.current) {
            return void 0;
        }

        emitter.off('messageToSocket');
        emitter.on('messageToSocket', (message) => {
            webViewRef.current!.postMessage(message);
        });
    }, [webViewRef.current]);

    const onMessage = useCallback((data: WebViewMessageEvent) => {
        try {
            const message = JSON.parse(data.nativeEvent.data);
            switch (message.T) {
                case 'pp':
                    console.log('Ping pong');
                    emitter.trigger('messageToSocket', data.nativeEvent.data);
                    break;
                case 'i':
                    console.log('Client id is ', message.i);
                    break;
                case 'au':
                    emitter.trigger('messageFromSocket', message);
                    break;
                default:
                    console.log('Unknown data!', message);
            }
        } catch (e) {
            console.warn('Message is not JSON!');
        }

    }, []);

    return (
        <View style={style.container}>
            <WebView
                ref={webViewRef}
                onMessage={onMessage}
                source={{ html: template }}
            />
        </View>
    );
};
