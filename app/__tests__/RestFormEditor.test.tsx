import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import RestFormEditor from '../components/RestFormEditor/RestFormEditor';

describe('RestFormEditor', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);
  });

  afterAll(() => {
    localStorage.clear();
  });

  test('Should be rendered', async () => {
    const initQuery = {
      id: '123',
      type: 'rest',
      method: 'GET',
      url: 'https://',
      encodedUrl: '',
      headers: [{ id: 0, key: '', value: '' }],
      variables: [{ id: 0, key: '', value: '' }],
      body: '',
      sdlUrl: 'sdlUrl',
      jsonVariables: '',
    };

    localStorage.setItem('restoreQuery', JSON.stringify(initQuery));

    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve({ text: 'Fetch response' }),
      } as Response);
    });

    render(<RestFormEditor />);

    const methodDelector = screen.getAllByRole('combobox')[0];
    await userEvent.selectOptions(methodDelector, 'POST');
    expect(methodDelector).toBeDefined();

    const sendBtn = screen.getByText('send');
    await userEvent.click(sendBtn);
    expect(sendBtn).toBeDefined();

    const urlInput = screen.getAllByRole<HTMLInputElement>('textbox');
    await userEvent.type(urlInput[0], 'localhost');
    expect(urlInput[0].value).toBe('https://localhost');

    const valueInput = screen.getAllByPlaceholderText<HTMLInputElement>('value');
    await userEvent.type(valueInput[0], '1');
    expect(valueInput[0].value).toBe('1');

    await userEvent.type(valueInput[1], '1');
    expect(valueInput[1].value).toBe('1');
  });

  test('Should not restore inputs if last request graphql request', async () => {
    const initQuery = {
      id: '123',
      type: 'graphql',
      method: 'GET',
      url: 'https://',
      encodedUrl: '',
      headers: [{ id: 0, key: '', value: '' }],
      variables: [{ id: 0, key: '', value: '' }],
      body: '',
      sdlUrl: 'sdlUrl',
      jsonVariables: '',
    };

    localStorage.setItem('restoreQuery', JSON.stringify(initQuery));

    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve({ text: 'Fetch response' }),
      } as Response);
    });

    render(<RestFormEditor />);

    const sendBtn = screen.getByText('send');
    await userEvent.click(sendBtn);
    expect(sendBtn).toBeDefined();
  });
});
