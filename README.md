# Xaco Store

Una librería de gestión de estado ligera para Angular utilizando Signals.

## Instalación

```bash
npm install xaco-store
```

## Uso

### 1. Crear un Store

```typescript
import { Store } from 'xaco-store';

interface AppState {
  count: number;
  user: {
    name: string;
    email: string;
  };
}

const initialState: AppState = {
  count: 0,
  user: {
    name: '',
    email: ''
  }
};

const store = new Store<AppState>(initialState);
```

### 2. Obtener el Estado

```typescript
// Obtener el estado actual
const currentState = store.getState();

// Obtener el Signal del estado
const stateSignal = store.getStateSignal();
```

### 3. Actualizar el Estado

```typescript
// Actualizar el estado
store.updateState(state => ({
  ...state,
  count: state.count + 1
}));
```

### 4. Usar en Componentes

```typescript
import { Component } from '@angular/core';
import { Store } from 'xaco-store';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <h2>Count: {{ store.getState().count }}</h2>
      <button (click)="increment()">Increment</button>
    </div>
  `
})
export class CounterComponent {
  store = new Store<{ count: number }>({ count: 0 });

  increment() {
    this.store.updateState(state => ({
      count: state.count + 1
    }));
  }
}
```

## Características

- 🚀 Ligero y eficiente
- 🔄 Integración nativa con Signals de Angular
- 📦 Tipado fuerte con TypeScript
- 🎯 API simple y directa

## Licencia

MIT 