import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignInForm from '../components/Auth/SignInForm/SignInForm';

describe('SignInForm', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);
  });

  test('Should be rendered', async () => {
    render(<SignInForm />);

    expect(screen.getByText('sign_in')).toBeInTheDocument();

    const email = screen.getByLabelText<HTMLInputElement>('email');
    await userEvent.type(email, 'test@test.com');
    expect(email.value).toBe('test@test.com');

    const password = screen.getByLabelText<HTMLInputElement>('password');
    await userEvent.type(password, 'qwerty1!');
    expect(password.value).toBe('qwerty1!');

    const passwordVis = screen.getAllByRole<HTMLButtonElement>('button')[0];
    await userEvent.click(passwordVis);
    expect(passwordVis).toBeDefined();

    const submitBtn = screen.getByText('submit_btn');
    await userEvent.click(submitBtn);
    expect(submitBtn).toBeDefined();
  });
});
