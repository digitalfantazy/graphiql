import updateGraphUrl from '@/app/utils/updateGraphUrl';

describe('updateGraphUrl', () => {
  test('Correct path with type body', () => {
    expect(updateGraphUrl({ type: 'body', value: 'value' }));
  });

  test('Correct path with type headers', () => {
    expect(updateGraphUrl({ type: 'headers', value: [{ id: 0, key: '1', value: '2' }] }));
  });

  test('Correct path with type url', () => {
    window.history.pushState('/', '');
    expect(updateGraphUrl({ type: 'url', value: 'value' }));
  });
});
