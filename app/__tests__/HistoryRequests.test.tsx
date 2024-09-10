import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryRequests from '../components/HistoryRequests/HistoryRequests';

describe('HistoryRequests', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);
  });

  test('Should be render loading if no requests', () => {
    render(<HistoryRequests />);

    const text = screen.getByText('no_requests');
    expect(text).toBeInTheDocument();
  });

  test('Should be render loading if no requests', () => {
    const query = {
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
    localStorage.setItem('allHistoryQueries', JSON.stringify([query]));

    render(<HistoryRequests />);

    const text = screen.getByText('GRAPHQL');
    expect(text).toBeInTheDocument();
  });

  test('Should be save restore object to LS on link click (graphql)', async () => {
    const query = {
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

    localStorage.setItem('allHistoryQueries', JSON.stringify([query]));
    vi.spyOn(console, 'error').mockImplementation(() => null);

    render(<HistoryRequests />);

    const link = screen.getByRole('link', { name: 'GRAPHQL https://' });
    await userEvent.click(link);
    expect(localStorage.getItem('restoreQuery')).toBe(JSON.stringify(query));
  });

  test('Should be save restore object to LS on link click (rest)', async () => {
    const query = {
      id: '123',
      type: 'rest',
      method: 'GET',
      url: 'http',
      encodedUrl: '',
      headers: [{ id: 0, key: '', value: '' }],
      variables: [{ id: 0, key: '', value: '' }],
      body: '',
      sdlUrl: 'sdlUrl',
      jsonVariables: '',
    };

    localStorage.setItem('allHistoryQueries', JSON.stringify([query]));
    vi.spyOn(console, 'error').mockImplementation(() => null);

    render(<HistoryRequests />);

    const text = screen.getByText('http');
    await userEvent.click(text);
    expect(localStorage.getItem('restoreQuery')).toBe(JSON.stringify(query));
  });
});
