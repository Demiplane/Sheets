import * as React from 'react';
import combineClasses from './combineClasses';

const NumberInput: React.StatelessComponent<{
  className?: string,
  onChange: (value: number) => void,
  value: number,
  min?: number,
  max?: number
}> = ({ className, onChange, value, min, max }) => {
  const classes = combineClasses('text-center', className);

  return (
    <input
      style={{ width: '75px' }}
      type="number"
      className={classes}
      value={value}
      min={min}
      max={max}
      onClick={event => event.stopPropagation()}
      onChange={event => {
        event.preventDefault();
        onChange(Number(event.currentTarget.value));
        event.stopPropagation();
      }}
    />
  );
};

export default NumberInput;