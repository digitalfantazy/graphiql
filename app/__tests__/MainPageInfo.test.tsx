import { render, screen } from '@testing-library/react';
import MainPageInfo from '../components/MainPageInfo/MainPageInfo';

describe('MainPageInfo', () => {
  test('Should be rendered', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);
    render(<MainPageInfo />);

    expect(screen.getByText('title_project')).toBeInTheDocument();
  });
});
