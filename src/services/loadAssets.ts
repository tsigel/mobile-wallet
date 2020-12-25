import { Asset } from '../types';

export const loadAssets = (assets: Array<string>): Promise<Array<Asset>> => {
    return fetch('https://api.wavesplatform.com/v0/assets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: assets })
    })
        .then((r) => r.json())
        .then((response) => response.data.map((item: any) => item.data));
}
