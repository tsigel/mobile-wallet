import { libs } from '@waves/waves-transactions';


export const getAuthToken = (seed: string) => {
    const chain_code = 'W';
    const client_id = 'waves.exchange';
    const seconds = Math.round((Date.now() + 1000 * 60 * 60 * 24 * 7) / 1000); // Token for a week

    const bytes = [
        255, 255, 255, 1,
        ...Array.from(libs.crypto.stringToBytes(`${chain_code}:${client_id}:${seconds}`))
    ];
    const signature = libs.crypto.signBytes(seed, bytes);

    return fetch('https://api.waves.exchange/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        body: [
            'grant_type=password',
            'scope=general',
            `username=${encodeURIComponent(libs.crypto.publicKey(seed))}`,
            'password=' + encodeURIComponent(`${seconds}:${signature}`),
            `client_id=${client_id}`
        ].join('&')
    }).then(r => r.json()).then(({ access_token }) => access_token);
};
