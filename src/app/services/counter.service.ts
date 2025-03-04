import { Injectable } from '@angular/core';
import { StoreService } from '../../lib/store/store.service';
import { Signal } from '@angular/core';

const STORE_KEY = 'counter';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  public readonly state: Signal<number>;
  public readonly increment: () => void;
  public readonly decrement: () => void;

  constructor(private storeService: StoreService) {
    const { state, increment, decrement } = this.storeService.createStore<number, {
      increment: (state: number) => number;
      decrement: (state: number) => number;
    }>(
      STORE_KEY,
      0,
      {
        increment: (state) => state + 1,
        decrement: (state) => state - 1
      }
    );
    
    this.state = state;
    this.increment = increment;
    this.decrement = decrement;
  }
} 