import { ChangeEvent } from 'react';
import { addEmptyRow, changeRow, removeRow } from '../../utils/tableEditorHelpers';

describe('tableEditorHelpers', () => {
  test('addEmptyRow', () => {
    const array = [{ id: 1, key: 'header', value: 'value' }];
    const setState = vi.fn();

    expect(addEmptyRow(setState, array)).toBeUndefined();
  });

  test('removeRow', () => {
    const array = [{ id: 1, key: 'header', value: 'value' }];
    const setState = vi.fn();

    expect(removeRow(setState, array, 1)).toBeUndefined();
    expect(removeRow(setState, array, 2)).toBeUndefined();
  });

  test('changeRow', () => {
    const array = [{ id: 1, key: 'header', value: 'value' }];
    const setState = vi.fn();

    const event1 = { target: { value: 'a', name: 'key' } } as ChangeEvent<HTMLInputElement>;
    const event2 = { target: { value: 'a', name: 'value' } } as ChangeEvent<HTMLInputElement>;

    expect(changeRow(event1, 0, setState, array)).toBeUndefined();
    expect(changeRow(event2, 0, setState, array)).toBeUndefined();
  });
});
