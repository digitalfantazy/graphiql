import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header/Header';

describe('Header', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);
  });

  test('Should be rendered with token', async () => {
    render(<Header hasToken />);

    const signOutBtn = screen.getByText('sign_out');
    await userEvent.click(signOutBtn);
    expect(signOutBtn).toBeDefined();

    fireEvent.scroll(window, { target: { scrollY: 1 } });
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(screen.getByText('sign_out')).toBeInTheDocument();
    expect(screen.queryByText('sign_in')).not.toBeInTheDocument();
  });
});
