export type Func<T extends Array<any>, R> = (...args: T) => R;

export type Without<T extends Record<any, any>, E extends keyof T> = {
    [Key in Exclude<keyof T, E>]: T[Key];
}

export type ThemeMode = 'dark' | 'light';

export type Asset<LONG> = {
    description: string
    hasScript: boolean;
    height: number;
    id: string;
    minSponsoredFee: LONG | null;
    name: string;
    precision: number;
    quantity: LONG;
    reissuable: boolean;
    sender: string;
    ticker: string | null;
    timestamp: Date;
}
