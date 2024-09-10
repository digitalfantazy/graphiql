import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JsonEditor from '../components/JsonEditor/JsonEditor';

describe('JsonEditor', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);
  });

  const props = {
    title: 'body',
    value: '',
    name: 'name',
    rows: 10,
    cols: 10,
    placeholder: 'placeholder',
    handleChangeValue: () => vi.fn(),
    handleFocusOut: () => vi.fn(),
  };

  test('Should be render', async () => {
    render(
      <JsonEditor
        title={props.title}
        value={props.value}
        rows={props.rows}
        cols={props.cols}
        name={props.name}
        placeholder={props.placeholder}
        handleChangeValue={props.handleChangeValue}
        handleFocusOut={props.handleFocusOut}
      />
    );

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'some');
    expect(textarea).toBeInTheDocument();
  });

  test('Should work prettify onclick', async () => {
    render(
      <JsonEditor
        title={props.title}
        value={props.value}
        rows={props.rows}
        cols={props.cols}
        name={props.name}
        placeholder={props.placeholder}
        handleChangeValue={props.handleChangeValue}
        handleFocusOut={props.handleFocusOut}
      />
    );

    const prettifyBtn = screen.getByText('prettify');
    await userEvent.click(prettifyBtn);
  });

  test('Should pretty valid json', async () => {
    const badProps = {
      title: 'body',
      value: '{"test":"test"}',
      name: 'name',
      rows: 10,
      cols: 10,
      placeholder: 'placeholder',
      handleChangeValue: () => vi.fn(),
      handleFocusOut: () => vi.fn(),
    };

    render(
      <JsonEditor
        title={badProps.title}
        value={badProps.value}
        rows={badProps.rows}
        cols={badProps.cols}
        name={badProps.name}
        placeholder={badProps.placeholder}
        handleChangeValue={badProps.handleChangeValue}
        handleFocusOut={props.handleFocusOut}
      />
    );

    const prettifyBtn = screen.getByText('prettify');
    await userEvent.click(prettifyBtn);
  });

  test('Should hide pretty button on Text select', async () => {
    const badProps = {
      title: 'body',
      value: '{"test":"test"}',
      name: 'name',
      rows: 10,
      cols: 10,
      placeholder: 'placeholder',
      handleChangeValue: () => vi.fn(),
      handleFocusOut: () => vi.fn(),
    };

    render(
      <JsonEditor
        title={badProps.title}
        value={badProps.value}
        rows={badProps.rows}
        cols={badProps.cols}
        name={badProps.name}
        placeholder={badProps.placeholder}
        handleChangeValue={badProps.handleChangeValue}
        handleFocusOut={props.handleFocusOut}
      />
    );

    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'Text');

    const prettifyBtn = screen.queryByText('prettify');
    expect(prettifyBtn).not.toBeInTheDocument();
  });
});
