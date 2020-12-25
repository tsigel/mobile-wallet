import create from '@waves/node-api-js';

export const NODE_URL = 'https://nodes-testnet.wavesnodes.com' ?? 'https://nodes.waves.exchange';
export const SEED = 'merry help cycle scrub adult element initial old devote moon waste inside steel version post';

export const api = create(NODE_URL);
