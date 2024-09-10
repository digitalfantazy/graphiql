import makeRequest, { RequestArgs } from '../../utils/makeRequest';

describe('makeRequest', () => {
  test('Do success request', async () => {
    const mockProps = {
      params: {
        slug: [
          'aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE%3D',
          'eyJ0ZXN0IjoidmFsdWUifQ%3D%3D',
        ],
        locale: 'en',
        rest: 'GET',
      },
      searchParams: { 'Content-Type': 'application/json' },
      type: 'rest',
    } satisfies RequestArgs;

    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        statusText: 'mockStatusText',
        json: () => Promise.resolve({ test: 'test' }),
      } as Response);
    });

    expect(await makeRequest(mockProps)).toStrictEqual({
      data: '{"test":"test"}',
      errorMsg: '',
      status: '200 mockStatusText',
    });
  });

  test('Do failed request', async () => {
    const mockProps = {
      params: {
        slug: [
          'aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE%3D',
          'eyJ0ZXN0IjoidmFsdWUifQ%3D%3D',
        ],
        locale: 'en',
        rest: 'POST',
      },
      searchParams: { 'Content-Type': 'application/json' },
      type: 'rest',
    } satisfies RequestArgs;

    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.reject(new Error('Test Error', { cause: 'cause' }));
    });

    expect(await makeRequest(mockProps)).toStrictEqual({
      data: '',
      errorMsg: 'Error Test Error cause',
      status: '',
    });
  });

  test('Return empty data if no url parameters', async () => {
    const mockProps = {
      params: { slug: [], locale: '', rest: '' },
      searchParams: {},
      type: 'rest',
    } satisfies RequestArgs;

    expect(await makeRequest(mockProps)).toStrictEqual({
      data: '',
      errorMsg: '',
      status: '',
    });
  });

  test('Do success request with two slug', async () => {
    const mockProps = {
      params: {
        slug: ['GRAPHQL', ''],
        locale: 'en',
        rest: '',
      },
      searchParams: null!,
      type: 'graphql',
    } satisfies RequestArgs;

    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        statusText: 'mockStatusText',
        json: () => Promise.resolve({ test: 'test' }),
      } as Response);
    });

    expect(await makeRequest(mockProps)).toStrictEqual({
      data: '{"test":"test"}',
      errorMsg: '',
      status: '200 mockStatusText',
    });
  });

  test('Redirect when wrong url structure', async () => {
    const mockProps = {
      params: {
        slug: [
          'aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE%3D',
          'eyJ0ZXN0IjoidmFsdWUifQ%3D%3D',
          'more',
        ],
        locale: 'en',
        rest: 'POST',
      },
      searchParams: { 'Content-Type': 'application/json' },
      type: 'rest',
    } satisfies RequestArgs;

    vitest.mock('next/navigation', () => ({
      redirect: vi.fn(),
    }));

    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        statusText: 'mockStatusText',
        json: () => Promise.resolve({ test: 'test' }),
      } as Response);
    });

    expect(await makeRequest(mockProps)).toStrictEqual({
      data: '{"test":"test"}',
      errorMsg: '',
      status: '200 mockStatusText',
    });
  });
});
