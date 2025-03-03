import { Component } from '@angular/core';
import { ControlCounter } from './components/control-counter/control-counter.component';
import { DisplayCounter } from './components/display-counter/display-counter.component';

@Component({
    selector: 'app-root',
    template: `
        <div class="container">
            <h1>Xaco Store Demo</h1>
            <div class="counters">
                <app-control-counter></app-control-counter>
                <app-display-counter></app-display-counter>
            </div>
        </div>
    `,
    styles: [`
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
        .counters {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    `],
    standalone: true,
    imports: [ControlCounter, DisplayCounter]
})
export class AppComponent {
    title = 'xaco-store-demo';
} 