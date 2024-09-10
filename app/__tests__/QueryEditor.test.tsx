import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QueryEditor from '../components/QueryEditor/QueryEditor';

describe('QueryEditor', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);
  });

  const props = {
    value: 'value',
    name: 'name',
    rows: 10,
    cols: 10,
    placeholder: 'placeholder',
    handleChangeQuery: () => vi.fn(),
    handleFocusOut: () => vi.fn(),
  };

  test('Should be render', async () => {
    render(
      <QueryEditor
        value={props.value}
        rows={props.rows}
        cols={props.cols}
        name={props.name}
        placeholder={props.placeholder}
        handleChangeQuery={props.handleChangeQuery}
        handleFocusOut={props.handleFocusOut}
      />
    );

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'some');
    expect(textarea).toBeInTheDocument();
  });

  test('Should work prettify onclick', async () => {
    render(
      <QueryEditor
        value={props.value}
        rows={props.rows}
        cols={props.cols}
        name={props.name}
        placeholder={props.placeholder}
        handleChangeQuery={props.handleChangeQuery}
        handleFocusOut={props.handleFocusOut}
      />
    );

    const prettifyBtn = screen.getByText('prettify');
    await userEvent.click(prettifyBtn);
  });

  test('Should pretty valid json', async () => {
    const goodProps = {
      value: `query {
                characters {
                  results {
                    id
                  }
                }
              }`,
      name: 'name',
      rows: 10,
      cols: 10,
      placeholder: 'placeholder',
      handleChangeQuery: () => vi.fn(),
      handleFocusOut: () => vi.fn(),
    };

    render(
      <QueryEditor
        value={goodProps.value}
        rows={goodProps.rows}
        cols={goodProps.cols}
        name={goodProps.name}
        placeholder={goodProps.placeholder}
        handleChangeQuery={goodProps.handleChangeQuery}
        handleFocusOut={props.handleFocusOut}
      />
    );

    const prettifyBtn = screen.getByText('prettify');
    await userEvent.click(prettifyBtn);
  });

  test('Should render without textarea value', async () => {
    const goodProps = {
      value: '',
      name: 'name',
      rows: 10,
      cols: 10,
      placeholder: 'placeholder',
      handleChangeQuery: () => vi.fn(),
      handleFocusOut: () => vi.fn(),
    };

    render(
      <QueryEditor
        value={goodProps.value}
        rows={goodProps.rows}
        cols={goodProps.cols}
        name={goodProps.name}
        placeholder={goodProps.placeholder}
        handleChangeQuery={goodProps.handleChangeQuery}
        handleFocusOut={props.handleFocusOut}
      />
    );

    const prettifyBtn = screen.getByText('prettify');
    await userEvent.click(prettifyBtn);
  });
});
