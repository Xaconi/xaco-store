import { Signal, signal } from '@angular/core';

export class Store<T> {
    private _state: Signal<T>;

    constructor(initialState: T) {
        this._state = signal(initialState);
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
} 