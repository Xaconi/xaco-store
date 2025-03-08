import { Injectable, Signal, signal } from '@angular/core';
import { Store, StoreAction, StoreMap } from '../models/store';

@Injectable({
    providedIn: 'root',
})
export class StoreService {
    private _stores: StoreMap<any> = new Map();

    public createStore<T>(key: string, initialState: T, actions: StoreAction<T>): Store<T> {
        if (!this._stores.has(key)) {
            const state = signal(initialState);
            this._stores.set(key, {
                state,
                readonlyState: state.asReadonly(),
                initialState,
                actions,
            });
        }
        return this.getStore<T>(key);
    }

    public getStore<T>(key: string): Store<T> {
        const store = this._stores.get(key);
        if (!store) {
            throw new Error(
                `Store with key "${key}" not found. Create it first using createStore.`
            );
        }

        const actionCreators = Object.keys(store.actions).reduce(
            (acc, actionIndex) => {
                acc[actionIndex] = (payload?: unknown): void => {
                    const currentState = store.state() as T;
                    const stateActionResult = store.actions[actionIndex](
                        currentState,
                        payload
                    ) as T;
                    store.state.set(stateActionResult);
                };
                return acc;
            },
            {} as { [K in keyof StoreAction<T>]: (payload?: any) => void }
        );

        return {
            state: store.readonlyState,
            resetStore: () => store.state.set(store.initialState),
            ...actionCreators,
        } as Store<T>;
    }

    public getStateSignal<T>(key: string): Signal<T> {
        const store = this._stores.get(key);
        if (!store) {
            throw new Error(`Store with key "${key}" not found`);
        }
        return store.readonlyState;
    }

    public clearStore(key: string): void {
        this._stores.delete(key);
    }

    public clearAllStores(): void {
        this._stores.clear();
    }
}
