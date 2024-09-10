import logOutAction from '@/app/services/firebase/logOutAction';

describe('logOutAction', () => {
  test('Call without crashing', () => {
    expect(logOutAction('en'));
  });
});
