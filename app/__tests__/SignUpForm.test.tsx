import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm from '../components/Auth/SignUpForm/SignUpForm';

describe('SignUpForm', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);
  });

  test('Should be rendered', async () => {
    render(<SignUpForm />);

    expect(screen.getByText('sign_up')).toBeInTheDocument();

    const name = screen.getByLabelText<HTMLInputElement>('name');
    await userEvent.type(name, 'name');
    expect(name.value).toBe('name');

    const email = screen.getByLabelText<HTMLInputElement>('email');
    await userEvent.type(email, 'test@test.com');
    expect(email.value).toBe('test@test.com');

    const password = screen.getByLabelText<HTMLInputElement>('password');
    await userEvent.type(password, 'qwerty1!');
    expect(password.value).toBe('qwerty1!');

    const submitBtn = screen.getByText('submit_btn');
    await userEvent.click(submitBtn);
    expect(submitBtn).toBeDefined();
  });
});
