import AsyncStorage from '@react-native-async-storage/async-storage';
import { isNil, not, pipe } from 'ramda';
import { libs } from '@waves/waves-transactions';
import { getAuthToken } from './getAuthToken';
import { Balances } from './Balances';

export class User {
    public seed: string;
    public address: string;
    public token: string;
    public balances: Balances;

    constructor(seed: string, token: string) {
        this.address = libs.crypto.address(seed);
        this.token = token;
        this.seed = seed;
        this.balances = new Balances(this.address, token);
    }

    public static hasUsers(): Promise<boolean> {
        return AsyncStorage.getItem('user')
            .then(pipe(isNil, not));
    }

    public static login(password: string): Promise<User> {
        return AsyncStorage.getItem('user')
            .then((encrypted: string | null) => libs.crypto.decryptSeed(encrypted ?? '', password, 5000))
            .then((seed) => getAuthToken(seed)
                .then(token => new User(seed, token))
            );
    }

    public static create(password: string, seed: string): Promise<User> {
        return AsyncStorage.setItem('user', libs.crypto.encryptSeed(seed, password, 5000))
            .then(() => getAuthToken(seed))
            .then((token) => new User(seed, token));
    }

    public static getCheckPasswordApi(): Promise<(password: string) => boolean> {
        return AsyncStorage.getItem('user')
            .then((user) => {
                if (!user) {
                    throw new Error('Has no user!');
                }

                return (password: string): boolean => {
                    try {
                        const seed = libs.crypto.decryptSeed(user, password, 5000);
                        if (seed.length > 10) {
                            return true;
                        }
                        return false;
                    } catch (e) {
                        console.log(e);
                        return false;
                    }
                };
            });
    }
}
