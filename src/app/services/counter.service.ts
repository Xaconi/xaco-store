import { Injectable, computed } from '@angular/core';
import { StoreService } from '../../lib/store/store.service';
import { Signal } from '@angular/core';

const STORE_KEY = 'counter';

@Injectable({
    providedIn: 'root',
})
export class CounterService {
    public readonly state: Signal<number>;
    public readonly increment: () => void;
    public readonly decrement: () => void;

    constructor(private storeService: StoreService) {
        const { state, increment, decrement } = this.storeService.createStore<number>(
            STORE_KEY,
            0,
            {
                increment: (state: number) => state + 2,
                decrement: (state: number) => state - 1,
            }
        );

        this.state = computed(() => state());
        this.increment = increment;
        this.decrement = decrement;
    }
}
