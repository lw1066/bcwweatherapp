import { showUserFeedback } from './showUserFeedback';
import '@testing-library/jest-dom';

describe('showUserFeedback', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.useFakeTimers();
  });

  it('creates a toast with the correct message', () => {
    const message = 'Test notification';
    showUserFeedback(message);

    const toast = document.getElementById('toast');

    expect(toast).toBeInTheDocument();
    expect(toast?.innerText).toEqual(message);
  });

  it('applies the correct styles to the toast', () => {
    const message = 'Test notification';
    showUserFeedback(message);

    const toast = document.querySelector('div');
    expect(toast).toHaveStyle({
      position: 'fixed',
      bottom: '100px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#f44336',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      zIndex: '9999',
    });
  });

  it('removes the toast after 3 seconds', () => {
    jest.useFakeTimers();
    const message = 'Test notification';
    showUserFeedback(message);

    // Advance timers by 3 seconds
    jest.advanceTimersByTime(3000);

    const toast = document.querySelector('div');
    expect(toast).not.toBeInTheDocument();
  });
});
