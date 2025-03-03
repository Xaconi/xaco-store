import { Store } from '../../lib/store/signal-store';

export interface CounterState {
    count: number;
}

export const counterStore = new Store<CounterState>({ count: 0 }, 'counter'); 