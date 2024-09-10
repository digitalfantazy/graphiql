import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ControlledInput from '../components/ControlledInput/ControlledInput';

describe('ControlledInput', () => {
  const props = {
    className: '',
    labelName: 'LabelName',
    labelClassName: 'LableClassname',
    id: 'id',
    name: 'name',
    value: 'Value',
    placeholder: 'Placeholder',
    handleChange: () => vi.fn(),
  };

  test('Should be rendered', async () => {
    render(
      <ControlledInput
        className={props.className}
        labelName={props.labelName}
        labelClassName={props.labelClassName}
        id={props.id}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        handleChange={props.handleChange}
      />
    );

    const input = screen.getByLabelText<HTMLInputElement>('LabelName');
    await userEvent.type(input, '1');
    expect(input).toBeDefined();
  });
});
