import { Injectable } from '@angular/core';
import { Signal, WritableSignal, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private _stores: Map<string, { state: WritableSignal<any> }> = new Map();

    createStore<T>(key: string, initialState: T): void {
        if (!this._stores.has(key)) {
            this._stores.set(key, { state: signal(initialState) });
        }
    }

    getStore<T>(key: string): { state: WritableSignal<T> } | undefined {
        return this._stores.get(key);
    }

    getState<T>(key: string): T {
        const store = this._stores.get(key);
        if (!store) {
            throw new Error(`Store with key "${key}" not found`);
        }
        return store.state();
    }

    updateState<T>(key: string, updater: (state: T) => T): void {
        const store = this._stores.get(key);
        if (!store) {
            throw new Error(`Store with key "${key}" not found`);
        }
        const currentState = store.state();
        store.state.set(updater(currentState));
    }

    getStateSignal<T>(key: string): Signal<T> {
        const store = this._stores.get(key);
        if (!store) {
            throw new Error(`Store with key "${key}" not found`);
        }
        return store.state;
    }

    clearStore(key: string): void {
        this._stores.delete(key);
    }

    clearAllStores(): void {
        this._stores.clear();
    }
} 