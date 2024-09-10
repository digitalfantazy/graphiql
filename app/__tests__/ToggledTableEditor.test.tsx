import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggledTableEditor from '../components/ToggledTableEditor/ToggledTableEditor';

describe('ToggledTableEditor', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);
  });

  test('Should be render for type "variables"', async () => {
    const props = {
      title: 'variables',
      data: [],
      handleAddData: () => vi.fn(),
      handleChangeData: () => vi.fn(),
      handleRemoveData: () => vi.fn(),
      handleFocusOut: () => vi.fn(),
    };

    render(
      <ToggledTableEditor
        title={props.title}
        data={props.data}
        handleAddData={props.handleAddData}
        handleChangeData={props.handleChangeData}
        handleRemoveData={props.handleRemoveData}
        handleFocusOut={props.handleFocusOut}
      />
    );

    const visBtn = screen.getByText(`manage ${props.title}`);
    await userEvent.click(visBtn);

    const text = screen.getByText('use_variable');
    expect(text).toBeInTheDocument();
  });

  test('Should be render for type "headers"', async () => {
    const props = {
      title: 'headers',
      data: [],
      handleAddData: () => vi.fn(),
      handleChangeData: () => vi.fn(),
      handleRemoveData: () => vi.fn(),
      handleFocusOut: () => vi.fn(),
    };

    render(
      <ToggledTableEditor
        title={props.title}
        data={props.data}
        handleAddData={props.handleAddData}
        handleChangeData={props.handleChangeData}
        handleRemoveData={props.handleRemoveData}
        handleFocusOut={props.handleFocusOut}
      />
    );

    const visBtn = screen.getByText(`manage ${props.title}`);
    await userEvent.click(visBtn);

    const text = screen.queryByText('use_variable');
    expect(text).not.toBeInTheDocument();
  });
});
