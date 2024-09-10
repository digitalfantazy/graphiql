import { ChangeEvent } from 'react';

interface Props {
  className: string;
  labelName: string;
  labelClassName: string;
  id: string;
  name: string;
  value: string;
  placeholder: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ControlledInput({
  className,
  labelName,
  labelClassName,
  id,
  name,
  value,
  placeholder,
  handleChange,
}: Props) {
  return (
    <>
      {labelName && (
        <label htmlFor={id} className={labelClassName}>
          {labelName}
        </label>
      )}
      <input
        className={className}
        id={id}
        type="text"
        name={name}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        placeholder={placeholder}
      />
    </>
  );
}
