export const template = `<script>

    document.addEventListener('message', (e) => {
        api.dispatch(e.data);
    });
    
    window.addEventListener('message', (e) => {
        api.dispatch(e.data);
    });

    const makeSocket = function () {
        return new WebSocket('wss://matcher.waves.exchange/ws/v0');
    };

    const send = (data) => {
        window.ReactNativeWebView.postMessage(data);
    };

    window.api = {
        onError: function () {
            const socket = makeSocket();
            api.addHandlers(socket);
        },
        addHandlers: function (socket) {
            api.ready = new Promise((resolve) => {
                socket.addEventListener('open', () => {
                    console.log('ready');
                    resolve(socket);
                });
                socket.addEventListener('error', () => {
                    api.onError();
                    send(JSON.stringify({ T: 'reopen' }));
                });
                socket.addEventListener('message', (event) => {
                    send(event.data);
                });
            });
        },
        dispatch: (message) => {
            api.ready.then((socket) => {
                console.log('Dispatch', message);
                socket.send(message);
            });
        }
    };
    api.onError();

</script>
`;
