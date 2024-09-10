import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import TestErrorComponent from '../components/ErrorBoundary/TestError';

describe('ErrorBoundary', () => {
  test('Should not render on init', () => {
    render(
      <ErrorBoundary>
        <TestErrorComponent />
      </ErrorBoundary>
    );

    const errorMsg = screen.queryByText('Something went wrong');
    expect(errorMsg).not.toBeInTheDocument();
  });

  test('Should catch error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);

    await act(() =>
      render(
        <ErrorBoundary>
          <TestErrorComponent />
        </ErrorBoundary>
      )
    );

    const errorBtn = screen.getByText('Throw error');
    await userEvent.click(errorBtn);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  test('Should catch error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);

    await act(() =>
      render(
        <ErrorBoundary>
          <TestErrorComponent />
        </ErrorBoundary>
      )
    );

    const errorBtn = screen.getByText('Throw error');
    await userEvent.click(errorBtn);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  test('Should close on closeBtn', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);

    await act(() =>
      render(
        <ErrorBoundary>
          <TestErrorComponent />
        </ErrorBoundary>
      )
    );

    const errorBtn = screen.getByText('Throw error');
    await userEvent.click(errorBtn);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    const closeBtn = screen.getByText('Close');
    await userEvent.click(closeBtn);
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  test('Should close on overlay click', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);

    await act(() =>
      render(
        <ErrorBoundary>
          <TestErrorComponent />
        </ErrorBoundary>
      )
    );

    const errorBtn = screen.getByText('Throw error');
    await userEvent.click(errorBtn);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    const overlay = screen.getByRole('presentation');
    await userEvent.click(overlay);
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });
});
