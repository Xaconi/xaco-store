import { Signal, signal } from '@angular/core';

export class Store<T> {
    private _state: Signal<T>;
    private static _stores: Map<string, Store<any>> = new Map();

    constructor(initialState: T, private readonly _key: string) {
        if (Store._stores.has(_key)) {
            this._state = Store._stores.get(_key)!._state;
        } else {
            this._state = signal(initialState);
            Store._stores.set(_key, this);
        }
    }

    getState(): T {
        return this._state();
    }

    updateState(updater: (state: T) => T): void {
        const currentState = this._state();
        this._state = signal(updater(currentState));
    }

    getStateSignal(): Signal<T> {
        return this._state;
    }

    static getStore<T>(key: string): Store<T> | undefined {
        return Store._stores.get(key);
    }

    static clearStore(key: string): void {
        Store._stores.delete(key);
    }

    static clearAllStores(): void {
        Store._stores.clear();
    }
} 