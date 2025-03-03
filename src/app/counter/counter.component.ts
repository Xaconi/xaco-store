import { Component } from '@angular/core';
import { Store } from '../../lib/store';

interface CounterState {
    count: number;
}

@Component({
    selector: 'app-counter',
    template: `
        <div class="counter">
            <h2>Counter: {{ counterStore.getState().count }}</h2>
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
    `]
})
export class CounterComponent {
    counterStore = new Store<CounterState>({ count: 0 });

    increment() {
        this.counterStore.updateState(state => ({ count: state.count + 1 }));
    }

    decrement() {
        this.counterStore.updateState(state => ({ count: state.count - 1 }));
    }
} 