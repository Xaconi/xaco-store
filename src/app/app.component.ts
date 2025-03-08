import { Component } from '@angular/core';
import { ControlCounterComponent } from './components/control-counter/control-counter.component';
import { DisplayCounterComponent } from './components/display-counter/display-counter.component';
import { ResetCounterComponent } from './components/reset-counter/reset-counter.component';

@Component({
    selector: 'lib-root',
    template: `
        <div class="container">
            <h1>Xaco Store Demo</h1>
            <div class="counters">
                <lib-display-counter />
                <lib-control-counter />
                <lib-reset-counter />
            </div>
        </div>
    `,
    styles: [
        `
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
        `,
    ],
    standalone: true,
    imports: [ControlCounterComponent, DisplayCounterComponent, ResetCounterComponent],
})
export class AppComponent {
    public title = 'xaco-store-demo';
}
