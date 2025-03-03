import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <div class="container">
      <h1>Xaco Store Demo</h1>
      <app-counter></app-counter>
    </div>
  `,
    styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }
  `]
})
export class AppComponent {
    title = 'xaco-store-demo';
} 