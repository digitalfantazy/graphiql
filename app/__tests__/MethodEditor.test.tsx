import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MethodEditor from '../components/MethodEditor/MethodEditor';

describe('MethodEditor', () => {
  const props = {
    method: 'GET',
    handleChangeMethod: () => vi.fn(),
  };

  test('Should be render', () => {
    render(<MethodEditor method={props.method} handleChangeMethod={props.handleChangeMethod} />);

    const select = screen.getByDisplayValue('GET');
    expect(select).toBeInTheDocument();
  });

  test('Should change method', async () => {
    render(<MethodEditor method={props.method} handleChangeMethod={props.handleChangeMethod} />);

    const select = screen.getByDisplayValue('GET');
    await userEvent.selectOptions(select, 'POST');
    expect(select).toBeInTheDocument();
  });
});
