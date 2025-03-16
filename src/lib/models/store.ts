import { Signal, WritableSignal } from '@angular/core';

export type StoreMap<T> = Map<
    string,
    {
        state: WritableSignal<T>;
        readonlyState: Signal<T>;
        initialState: T;
        actions: Record<string, (state: T, payload?: any) => any>;
        middlewares?: Array<Middleware<T>>;
    }
>;

export type StoreAction<T> = Record<string, (state: T, payload?: any) => T>;

export type Store<T> = {
    state: Signal<T>;
} & {
    [K in keyof StoreAction<T>]: (payload?: any) => void;
};

export type Middleware<T> = (currentState: T, nextState: T, action: string, payload?: any) => void;