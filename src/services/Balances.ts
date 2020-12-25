import { Matcher } from './socket/Matcher';
import { Func } from '../types';
import { EventEmitter } from 'typed-ts-events';

export class Balances {

    public pending: boolean = true;
    public balanceHash: Record<string, Matcher.BalanceItem> = Object.create(null);
    public balanceList: Array<Matcher.BalanceItem> = [];
    private emitter = new EventEmitter<Balances.Events>();


    constructor(address: string, token: string) {
        const matcher = new Matcher();
        matcher.subscribe(token, address);

        matcher.once('data', () => {
            this.pending = false;
        });

        matcher.on('data', this.onUpdateBalances, this);
    }

    public makeEffect(callback: Func<[Balances.EffectData], void>): Func<[], Func<[], void>> {
        return () => {
            callback(this.makeEffectData());

            this.emitter.on('change', callback);
            return () => {
                this.emitter.off('change', callback);
            };
        };
    }

    private onUpdateBalances(data: Matcher.DataEvent) {
        this.balanceHash = Object.assign(this.balanceHash, data.balances);
        const { WAVES, ...assets } = this.balanceHash;
        this.balanceList = [WAVES, ...Object.values(assets).sort(Balances.makeComparator())];

        this.emitter.trigger('change', this.makeEffectData());
    }

    private makeEffectData(): Balances.EffectData {
        return {
            hash: this.balanceHash,
            list: this.balanceList,
            pending: this.pending
        };
    }

    private static makeComparator(): (a: Matcher.BalanceItem, b: Matcher.BalanceItem) => number {
        const valueOf = (item: Matcher.BalanceItem) => item.asset.name;
        return (a, b) => valueOf(a) > valueOf(b) ? 1 : valueOf(a) < valueOf(b) ? -1 : 0;
    }
}

export namespace Balances {
    export type EffectData = {
        hash: Record<string, Matcher.BalanceItem>;
        list: Array<Matcher.BalanceItem>;
        pending: boolean;
    };

    export type Events = {
        change: EffectData;
    }
}
