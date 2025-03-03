import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../lib/store/store.service';
import { CounterState } from '../../types/counter.types';
import { Signal, computed } from '@angular/core';

@Component({
    selector: 'app-control-counter',
    template: `
        <div class="counter">
            <h2>Control Counter: {{ count() }}</h2>
            <div class="buttons">
                <button (click)="increment()">Increment</button>
                <button (click)="decrement()">Decrement</button>
            </div>
        </div>
    `,
    styles: [`
        .counter {
            margin: 20px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
        }
        .buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
        }
        button {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            background-color: #007bff;
            color: white;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    `],
    standalone: true,
    imports: []
})
export class ControlCounter implements OnInit {
    count!: Signal<number>;

    constructor(public storeService: StoreService) {}

    ngOnInit() {
        // Crear el store si no existe
        this.storeService.createStore<CounterState>('counter', { count: 0 });
        
        // Obtener el signal del estado
        const stateSignal = this.storeService.getStateSignal<CounterState>('counter');
        
        // Crear un signal derivado para el count
        this.count = computed(() => stateSignal().count);
    }

    increment() {
        this.storeService.updateState<CounterState>('counter', (state: CounterState) => ({
            count: state.count + 1
        }));
    }

    decrement() {
        this.storeService.updateState<CounterState>('counter', (state: CounterState) => ({
            count: state.count - 1
        }));
    }
} 