import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer/Footer';

describe('Footer', () => {
  test('Should be render', () => {
    render(<Footer />);

    const text = screen.getByText('RS School');
    expect(text).toBeInTheDocument();
  });
});
