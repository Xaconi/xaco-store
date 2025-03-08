import { Injectable } from '@angular/core';
import { Signal, WritableSignal, signal } from '@angular/core';
import { StoreAction, StoreMap, Store } from '../models/store';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private _stores: StoreMap<any> = new Map();

    createStore<T>(
        key: string, 
        initialState: T, 
        actions: StoreAction<T>
    ): Store<T> {
        if (!this._stores.has(key)) {
            const state = signal(initialState);
            this._stores.set(key, { 
                state,
                readonlyState: state.asReadonly(),
                actions
            });
        }
        return this.getStore<T>(key);
    }

    getStore<T>(
        key: string
    ): Store<T> {
        const store = this._stores.get(key);
        if (!store) {
            throw new Error(`Store with key "${key}" not found. Create it first using createStore.`);
        }

        const actionCreators = Object.keys(store.actions).reduce((acc, actionIndex) => {
            acc[actionIndex as keyof StoreAction<T>] = (payload?: any) => {
                const currentState = store.state();
                const stateActionResult = store.actions[actionIndex](currentState, payload);
                store.state.set(stateActionResult);
            };
            return acc;
        }, {} as { [K in keyof StoreAction<T>]: (payload?: any) => void });

        return {
            state: store.readonlyState,
            ...actionCreators
        } as Store<T>;
    }

    getStateSignal<T>(key: string): Signal<T> {
        const store = this._stores.get(key);
        if (!store) {
            throw new Error(`Store with key "${key}" not found`);
        }
        return store.readonlyState;
    }

    clearStore(key: string): void {
        this._stores.delete(key);
    }

    clearAllStores(): void {
        this._stores.clear();
    }
} 