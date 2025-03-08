import { Component, computed, Signal } from '@angular/core';
import { CounterService } from '../../services/counter.service';

@Component({
    selector: 'lib-display-counter',
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
export class DisplayCounterComponent {
    public count: Signal<number>;

    constructor(private counterService: CounterService) {
        this.count = computed(() => this.counterService.state());
    }

    public increment(): void {
        this.counterService.increment();
    }

    public decrement(): void {
        this.counterService.decrement();
    }
}
