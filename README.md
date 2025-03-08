# 🚀 Xaco Store

A lightweight state management library for Angular using Signals.

![test](https://badgen.net/bundlephobia/min/xaco-store)

## ✨ Features

- 🎯 Simple and intuitive API
- 🔄 Reactive state management with Signals
- 🎨 Type-safe with TypeScript
- 🔒 Immutable state by design
- 🚀 Zero dependencies
- 📦 Lightweight bundle size

## 🛠️ Installation

```bash
npm install xaco-store
```

## 🎮 Usage

### Create a Store

```typescript
import { Component, inject } from '@angular/core';
import { StoreService } from 'xaco-store';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <h2>Count: {{ count() }}</h2>
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
      <button (click)="add(5)">Add 5</button>
      <button (click)="resetStore()">Reset</button>
    </div>
  `,
  standalone: true
})
export class CounterComponent {
  private storeService = inject(StoreService);
  private readonly { state, increment, decrement, add, resetStore } = this.storeService.createStore<number>(
    'counter',
    0,
    {
      // Simple actions
      increment: state => state + 1,
      decrement: state => state - 1,
      // Action with payload
      add: (state, amount: number) => state + amount
    }
  );

  count = this.state;
}
```

### Subscribe to Store State

```typescript
import { Component, computed, inject } from '@angular/core';
import { StoreService } from 'xaco-store';

@Component({
  selector: 'app-counter-display',
  template: `
    <div class="counter-display">
      <h3>Double of count is: {{ doubleCount() }}</h3>
    </div>
  `,
  standalone: true
})
export class CounterDisplayComponent {
  private storeService = inject(StoreService);
  private readonly { state } = this.storeService.getStore<number>('counter');

  // State is readonly, can only be modified through store actions
  doubleCount = computed(() => this.state() * 2);
}
```

## 📚 API Reference

### StoreService.createStore

Creates a new store with the specified key, initial state, and actions. Types are automatically inferred from the initial state.

```typescript
createStore<T>(
  key: string,
  initialState: T,
  actions: Record<string, (state: T, payload?: any) => T>
): {
  state: Signal<T>;  // Readonly signal
  resetStore: () => void;  // Reset state to initial value
  [K in keyof typeof actions]: (payload?: any) => void;
}
```

#### Parameters

- `key`: Unique identifier for the store
- `initialState`: Initial state value
- `actions`: Pure functions that receive current state and return new state.

#### Returns

- `state`: Readonly signal containing the current state
- `resetStore`: Function to reset state to its initial value
- Action methods: Methods corresponding to each action defined

### StoreService.getStore

Retrieves an existing store by its key.

```typescript
getStore<T>(key: string): {
  state: Signal<T>;  // Readonly signal
  resetStore: () => void;  // Reset state to initial value
  [K in keyof typeof actions]: (payload?: any) => void;
}
```

## 🔒 State Management

The store follows these principles to ensure safe state management:

- State is immutable and can only be modified through defined actions
- Actions are pure functions that receive the current state and an optional payload, and return a new state
- The state signal is readonly, preventing accidental mutations
- Each action creates a new state instead of mutating the existing one
- State can be reset to its initial value at any time

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Made with 💖 by @Xaconi
