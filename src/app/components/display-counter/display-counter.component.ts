import { Component } from '@angular/core';
import { CounterService } from '../../services/counter.service';
import { computed, Signal } from '@angular/core';

@Component({
    selector: 'app-display-counter',
    template: `
        <div class="counter">
            <h2>Display Counter: {{ count() }}</h2>
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
                background-color: #f8f9fa;
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
                background-color: #28a745;
                color: white;
                cursor: pointer;
            }
            button:hover {
                background-color: #218838;
            }
        `,
    ],
    standalone: true,
    imports: [],
})
export class DisplayCounter {
    count: Signal<number>;

    constructor(private counterService: CounterService) {
        this.count = computed(() => this.counterService.state());
    }

    increment() {
        this.counterService.increment();
    }

    decrement() {
        this.counterService.decrement();
    }
}
