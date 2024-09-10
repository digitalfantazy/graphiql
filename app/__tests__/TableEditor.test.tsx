import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TableEditor from '../components/TableEditor/TableEditor';

describe('TableEditor', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);
  });

  test('Should be render without data', () => {
    const props = {
      title: 'title',
      data: [],
      handleAddData: () => vi.fn(),
      handleChangeData: () => vi.fn(),
      handleRemoveData: () => vi.fn(),
      handleFocusOut: () => vi.fn(),
    };

    render(
      <TableEditor
        title={props.title}
        data={props.data}
        handleAddData={props.handleAddData}
        handleChangeData={props.handleChangeData}
        handleRemoveData={props.handleRemoveData}
        handleFocusOut={props.handleFocusOut}
      />
    );

    const text = screen.getByText('Title');
    expect(text).toBeInTheDocument();
  });

  test('Should be render with data', async () => {
    const props = {
      title: 'title',
      data: [{ id: 1, key: 'InputKey', value: 'InputValue' }],
      handleAddData: () => vi.fn(),
      handleChangeData: () => vi.fn(),
      handleRemoveData: () => vi.fn(),
      handleFocusOut: () => vi.fn(),
    };

    render(
      <TableEditor
        title={props.title}
        data={props.data}
        handleAddData={props.handleAddData}
        handleChangeData={props.handleChangeData}
        handleRemoveData={props.handleRemoveData}
        handleFocusOut={props.handleFocusOut}
      />
    );

    const input = screen.getAllByRole('textbox');
    await userEvent.type(input[0], '1');
    await userEvent.type(input[1], '2');

    expect(input[0]).toBeInTheDocument();
    expect(input[1]).toBeInTheDocument();

    const removeBtn = screen.getByText('X');
    await userEvent.click(removeBtn);
  });
});
