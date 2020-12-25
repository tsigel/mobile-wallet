import { Asset, Func } from '../types';
import { BigNumber } from '@waves/bignumber';
import { assetsDataProvider } from '../services/assetsDataProvider';

export const loadAssetEffect = (assets: Array<string>, callback: Func<[Array<Asset<BigNumber>>], void>): Func<[], Func<[], void>> =>
    () => {
        const stream = assetsDataProvider.getAssets(assets)
            .subscribe((assets) => {
                callback(assets)
                stream.unsubscribe();
            });
        return () => {
            stream.unsubscribe();
        }
    }
