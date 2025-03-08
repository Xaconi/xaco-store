import { Component } from '@angular/core';
import { computed, Signal } from '@angular/core';
import { StoreService } from 'src/lib/store/store.service';

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
    styles: [
        `
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
        `,
    ],
    standalone: true,
    imports: [],
})
export class ControlCounter {
    count: Signal<number>;
    public readonly increment: () => void;
    public readonly decrement: () => void;

    constructor(private storeService: StoreService) {
        const {
            state: counterState,
            increment,
            decrement,
        } = this.storeService.getStore<number>('counter');
        this.count = computed(() => counterState());

        this.increment = increment;
        this.decrement = decrement;
    }
}
