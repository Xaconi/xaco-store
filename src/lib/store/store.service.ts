import { Injectable } from '@angular/core';
import { Signal, WritableSignal, signal } from '@angular/core';

type Store<T, A extends Record<string, (state: T, payload?: any) => T>> = {
  state: Signal<T>;
} & {
  [K in keyof A]: (payload?: any) => void;
};

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private _stores: Map<string, { 
        state: WritableSignal<any>;
        actions: Record<string, (state: any, payload?: any) => any>;
    }> = new Map();

    createStore<T, A extends Record<string, (state: T, payload?: any) => T>>(
        key: string, 
        initialState: T, 
        actions: A
    ): Store<T, A> {
        if (!this._stores.has(key)) {
            this._stores.set(key, { 
                state: signal(initialState),
                actions
            });
        }

        const state = this.getStateSignal<T>(key);
        const actionCreators = Object.keys(actions).reduce((acc, actionType) => {
            acc[actionType as keyof A] = (payload?: any) => {
                const store = this._stores.get(key);
                if (!store) return;
                const currentState = store.state();
                store.state.set(actions[actionType](currentState, payload));
            };
            return acc;
        }, {} as { [K in keyof A]: (payload?: any) => void });

        return {
            state,
            ...actionCreators
        } as Store<T, A>;
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