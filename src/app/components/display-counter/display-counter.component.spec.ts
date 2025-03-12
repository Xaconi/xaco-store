import { fireEvent, render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { DisplayCounterComponent } from './display-counter.component';

describe('DisplayCounterComponent', () => {
  it('should display the counter value', async () => {
    await render(DisplayCounterComponent);
    const counterElement = screen.getByText(/display counter/i);
    expect(counterElement).toBeInTheDocument();
  });

  it('should increment the counter when button is clicked', async () => {
    await render(DisplayCounterComponent);
    const button = screen.getByRole('button', { name: /increment/i });
    fireEvent.click(button);
    const counterElement = screen.getByText(/Display Counter: 2/i);
    expect(counterElement).toBeInTheDocument();
  });
});