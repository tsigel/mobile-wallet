import { createAssetsDataProvider } from '@waves.exchange/assets-data-provider';
import { DATA_SERVICE_URL } from '../constants';

export const assetsDataProvider = createAssetsDataProvider(DATA_SERVICE_URL);
