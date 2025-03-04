# 🚀 Xaco Store

A lightweight state management library for Angular using Signals.

## ✨ Features

- 🎯 Simple and intuitive API
- 🔄 Reactive state management with Signals
- 🎨 Type-safe with TypeScript
- 🚀 Zero dependencies
- 📦 Lightweight bundle size

## 🛠️ Installation

```bash
npm install xaco-store
```

## 🎮 Usage

### 1. Create a Store Service

```typescript
import { Injectable } from '@angular/core';
import { StoreService } from 'xaco-store';

const STORE_KEY = 'counter';

const counterActions = {
  increment: (state: number) => state + 1,
  decrement: (state: number) => state - 1
};

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  public readonly state: Signal<number>;
  public readonly increment: () => void;
  public readonly decrement: () => void;

  constructor(private storeService: StoreService) {
    const { state, increment, decrement } = this.storeService.createStore(
      STORE_KEY,
      0,
      counterActions
    );
    
    this.state = state;
    this.increment = increment;
    this.decrement = decrement;
  }
}
```

### 2. Use in Components

```typescript
@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <h2>Count: {{ count() }}</h2>
      <div class="buttons">
        <button (click)="increment()">+</button>
        <button (click)="decrement()">-</button>
      </div>
    </div>
  `
})
export class CounterComponent {
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
```

## 🎯 Live Examples

### Basic Counter
[![Edit Xaco Store Counter](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/xaco-store-counter-example)

### Todo List
[![Edit Xaco Store Todo List](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/xaco-store-todo-example)

## 📚 API Reference

### StoreService

#### createStore
```typescript
createStore(
  key: string,
  initialState: unknown,
  actions: Record<string, (state: unknown, payload?: unknown) => unknown>
): Store<typeof initialState, typeof actions>
```

#### getStore
```typescript
getStore(
  key: string
): Store<unknown, Record<string, (state: unknown, payload?: unknown) => unknown>>
```

#### getStateSignal
```typescript
getStateSignal(key: string): Signal<unknown>
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 

Made with 💖 by @Xaconi