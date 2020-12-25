import get from 'superagent';
import { applySpec, indexBy, map, path, pipe, prop } from 'ramda';

export const getGeneralAssets = (): Promise<Record<string, GeneralAsset>> =>
    get('https://configs.waves.exchange/mobile/v3/environment/prod/mainnet.json')
        .then<Response>(prop('body'))
        .then(pipe(
            prop('generalAssets'),
            map(applySpec<GeneralAsset>({
                icon: path(['iconUrls', 'default']),
                id: prop('assetId'),
                displayName: prop('displayName')
            })),
            indexBy(prop('id'))
        ));

export type GeneralAsset = {
    icon: string;
    id: string;
    displayName: string;
}

type Response = {
    generalAssets: Array<RawGeneralAsset>
}

type RawGeneralAsset = {
    assetId: string;
    displayName: string;
    icon: {
        default: string
    }
}
