import { computed } from '@angular/core';
import { StoreService } from './store.service';

describe('StoreService', () => {
    let storeService: StoreService;

    beforeEach(() => {
        storeService = new StoreService();
    });

    it('should create a store and allow state updates', () => {
        const { state, increment, decrement } = storeService.createStore<number>('counter', 0, {
            increment: state => state + 1,
            decrement: state => state - 1,
        });

        expect(state()).toBe(0);
        increment();
        expect(state()).toBe(1);
        decrement();
        expect(state()).toBe(0);
    });

    it('should reset the store to initial state', () => {
        const { state, resetStore, increment } = storeService.createStore<number>('counter', 0, {
            increment: state => state + 1,
        });

        increment();
        expect(state()).toBe(1);
        resetStore();
        expect(state()).toBe(0);
    });

    it('should inform to computed signal when state changes', () => {
        const { state, resetStore, increment } = storeService.createStore<number>('counter', 0, {
            increment: state => state + 1,
        });

        const computedSignal = computed(() => state()); // Esta línea ahora es válida

        increment();
        expect(computedSignal()).toBe(1);
        resetStore();
        expect(computedSignal()).toBe(0);
    });
});
