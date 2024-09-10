import getAuthToken from '@/app/services/firebase/getAuthToken';

describe('getAuthToken', () => {
  test('Create correct path with all incoming props', () => {
    expect(getAuthToken()).toBe('cookie_name');
  });
});
