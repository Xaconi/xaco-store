import { Component, computed, Signal } from '@angular/core';
import { StoreService } from 'src/lib/store/store.service';

@Component({
    selector: 'lib-reset-counter',
    template: `
        <div class="counter">
            <h2>Control Counter: {{ count() }}</h2>
            <div class="buttons">
                <button (click)="reset()">Reset</button>
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
export class ResetCounterComponent {
    public count: Signal<number>;
    public readonly reset: () => void;

    constructor(private storeService: StoreService) {
        const { state: counterState, resetStore } = this.storeService.getStore<number>('counter');
        this.count = computed(() => counterState());

        this.reset = resetStore;
    }
}
