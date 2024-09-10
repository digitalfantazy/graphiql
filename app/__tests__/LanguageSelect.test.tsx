import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import LanguageSelect from '../components/LanguageSelect/LanguageSelect';

describe('LanguageSelect', () => {
  test('Should be rendered', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);

    render(<LanguageSelect />);

    const select = screen.getByRole<HTMLSelectElement>('combobox');
    await userEvent.selectOptions(select, 'ru');
    expect(select).toBeDefined();
  });
});
