import { ChangeEvent, SetStateAction } from 'react';
import { RowElement } from '../components/RestFormEditor/types';

export function addEmptyRow(
  callback: (value: SetStateAction<RowElement[]>) => void,
  elementsArr: RowElement[]
): void {
  const rowElement = {
    id: elementsArr.length,
    key: '',
    value: '',
  } satisfies RowElement;

  callback([...elementsArr, rowElement]);
}

export function removeRow(
  callback: (value: SetStateAction<RowElement[]>) => void,
  elementsArr: RowElement[],
  id: number
): void {
  const newArray = elementsArr
    .filter((el) => el.id !== id)
    .map((el, i) => {
      return { ...el, id: i };
    });

  if (newArray.length) {
    callback(newArray);
  } else {
    callback([{ id: 0, key: '', value: '' }]);
  }
}

export function changeRow(
  e: ChangeEvent<HTMLInputElement>,
  id: number,
  callback: (value: SetStateAction<RowElement[]>) => void,
  elementsArr: RowElement[]
): void {
  const { value, name } = e.target;

  const newArray = elementsArr.slice();
  if (name === 'key') newArray[id].key = value;
  if (name === 'value') newArray[id].value = value;

  callback(newArray);
}
