import makeRestPath from '../../utils/makeRestPath';

describe('makeRestPath', () => {
  test('Create correct path for GET method', () => {
    const mockProps = {
      method: 'GET',
      url: 'testUrl',
      headers: [{ id: 1, key: 'header', value: 'value' }],
      variables: [{ id: 1, key: 'varKey', value: 'varValue' }],
      body: 'body',
    };

    expect(makeRestPath(mockProps)).toBe('/GET/dGVzdFVybA==');
  });

  test('Create correct path for not GET method', () => {
    const mockProps = {
      method: 'POST',
      url: 'testUrl',
      headers: [{ id: 1, key: 'header', value: 'value' }],
      variables: [{ id: 1, key: 'varKey', value: 'varValue' }],
      body: 'body',
    };

    expect(makeRestPath(mockProps)).toBe('/POST/dGVzdFVybA==/Ym9keQ==?header=value');
  });

  test('Create correct path for not GET method without body and headers', () => {
    const mockProps = {
      method: 'POST',
      url: 'testUrl',
      headers: [{ id: 0, key: '', value: '' }],
      variables: [{ id: 1, key: 'varKey', value: 'varValue' }],
      body: '',
    };

    expect(makeRestPath(mockProps)).toBe('/POST/dGVzdFVybA==');
  });
});
