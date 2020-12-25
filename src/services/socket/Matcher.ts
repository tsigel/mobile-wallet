import { EventEmitter } from 'typed-ts-events';
import { Asset } from '../../types';
import { assetsDataProvider } from '../assetsDataProvider';
import { BigNumber } from '@waves/bignumber';
import { App } from '../App';

export class Matcher {
    private emitter: EventEmitter<Matcher.Events> = new EventEmitter();
    protected address: string | null = null;
    protected token: string | null = null;

    constructor() {
        App.getPrivateEmitter().on('messageFromSocket', this.onMessage, this);
    }

    public subscribe(token: string, address: string): void {
        App.getPrivateEmitter().trigger('messageToSocket', JSON.stringify({
            'T': 'aus',
            'S': address,
            't': 'jwt',
            'j': token
        }));
    }

    public on<Key extends keyof Matcher.Events, SELF>(event: Key, handler: EventEmitter.IHandler<Matcher.Events[Key], SELF>, self?: SELF) {
        this.emitter.on(event, handler, self);
    }

    public once<Key extends keyof Matcher.Events, SELF>(event: Key, handler: EventEmitter.IHandler<Matcher.Events[Key], SELF>, self?: SELF) {
        this.emitter.once(event, handler, self);
    }

    public off<Key extends keyof Matcher.Events>(event: Key, handler: EventEmitter.IHandler<Matcher.Events[Key], any>) {
        this.emitter.off(event, handler);
    }

    protected onMessage(message: any) {
        switch (message.T) {
            case 'au':
                Matcher.parseData(message)
                    .then((data) => {
                        this.emitter.trigger('data', data);
                    });
                break;
            default:
                console.log('Unknown data!', message);
        }
    };

    private static parseData(message: any): Promise<Matcher.DataEvent> {
        const balances = message.b ?? { WAVES: [0, 0] };
        const acc: Record<string, Matcher.BalanceItem> = Object.create(null);

        return new Promise<Matcher.DataEvent>((resolve, reject) => {
            const stream = assetsDataProvider.getAssets(Object.keys(balances))
                .subscribe(
                    (assets) => {
                        assets.reduce((acc, asset) => {
                            acc[asset.id] = {
                                available: new BigNumber(balances[asset.id][0]),
                                reserved: new BigNumber(balances[asset.id][1]),
                                asset: asset,
                                isMain: !!App.generalAssets[asset.id]
                            };
                            return acc;
                        }, acc);
                        if (Object.keys(assets).length === Object.keys(balances).length) {
                            stream.unsubscribe();
                            resolve({ balances: acc });
                        }
                    },
                    reject
                );
        });
    }
}

export namespace Matcher {
    export type Events = {
        data: DataEvent;
        open: {};
    }

    export type DataEvent = {
        balances: Record<string, BalanceItem>
    }

    export type BalanceItem = {
        available: BigNumber;
        reserved: BigNumber;
        asset: Asset<BigNumber>;
        isMain: boolean;
    }
}
