import truncateText from '@/app/utils/textUtils';

describe('truncateText', () => {
  test('Should not change text smaller than maxLength', () => {
    const text = 'little';
    const maxLength = 10;

    expect(truncateText(text, maxLength)).toBe('little');
  });

  test('Should add ... if text larger than maxLength', () => {
    const text = 'VeryLargeText';
    const maxLength = 5;

    expect(truncateText(text, maxLength)).toBe('VeryL...');
  });
});
