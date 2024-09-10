import makeGraphQlPath from '../../utils/makeGraphQlPath';

describe('makeGraphQlPath', () => {
  test('Create correct path with all incoming props', () => {
    const mockProps = {
      url: 'testurl',
      query: 'testquery',
      variables: '{"var1":"var1value","var2":"var2value"}',
      headers: [{ id: 1, key: 'header', value: 'value' }],
    };

    expect(makeGraphQlPath(mockProps)).toBe(
      '/GRAPHQL/dGVzdHVybA==/eyJxdWVyeSI6InRlc3RxdWVyeSIsInZhcmlhYmxlcyI6eyJ2YXIxIjoidmFyMXZhbHVlIiwidmFyMiI6InZhcjJ2YWx1ZSJ9fQ==?header=value'
    );
  });

  test('Create correct path without variables prop', () => {
    const mockProps = {
      url: 'testurl',
      query: 'testquery',
      variables: '',
      headers: [{ id: 1, key: 'header', value: 'value' }],
    };

    expect(makeGraphQlPath(mockProps)).toBe(
      '/GRAPHQL/dGVzdHVybA==/eyJxdWVyeSI6InRlc3RxdWVyeSIsInZhcmlhYmxlcyI6e319?header=value'
    );
  });

  test('Create correct path with body without headers prop', () => {
    const mockProps = {
      url: 'testurl',
      query: 'testquery',
      variables: '',
      headers: [{ id: 0, key: '', value: '' }],
    };

    expect(makeGraphQlPath(mockProps)).toBe(
      '/GRAPHQL/dGVzdHVybA==/eyJxdWVyeSI6InRlc3RxdWVyeSIsInZhcmlhYmxlcyI6e319'
    );
  });
});
