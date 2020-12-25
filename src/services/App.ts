import { User } from './User';
import { GeneralAsset } from './getGeneralAssets';
import { Func, ThemeMode } from '../types';
import { EventEmitter } from 'typed-ts-events';

class AppStore {
    public user?: User;
    public generalAssets: Record<string, GeneralAsset> = Object.create(null);
    public theme: ThemeMode = 'dark';
    private emitter: EventEmitter<App.Events> = new EventEmitter();

    public hasUsers(): Promise<boolean> {
        return User.hasUsers();
    }

    public createUser(password: string, seed: string): Promise<AppStore> {
        return User.create(password, seed).then((user) => {
            this.user = user;
            return this;
        });
    }

    public login(password: string): Promise<void> {
        return User.login(password)
            .then(user => {
                this.user = user;
            });
    }

    public changeTheme(): void {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.emitter.trigger('theme', this.theme);
    }

    public makeEffectChangeTheme(callback: Func<[ThemeMode], void>): Func<[], Func<[], void>> {
        return () => {
            callback(this.theme);
            this.emitter.on('theme', callback);
            return () => {
                this.emitter.off('theme', callback);
            };
        };
    }

    public getPrivateEmitter() {
        return this.emitter;
    }
}

export namespace App {
    export type Events = {
        theme: ThemeMode;
        messageFromSocket: object;
        messageToSocket: string;
    }
}

export const App = new AppStore();
