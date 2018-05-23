import * as React from 'react';
import combineClasses from './combineClasses';

const NumberInput: React.StatelessComponent<{
  name?: string,
  className?: string,
  label?: string,
  onChange: (value: number) => void,
  value: number,
  min?: number,
  max?: number
}> = ({ className, label, onChange, value, min, max }) => {
  let wrapperClass = label ? 'form-group' : '';

  const classes = combineClasses(wrapperClass, className);

  return (
    <div className={classes}>
      {label && <label className="mr-2" htmlFor={name}>{label}</label>}
      <div className="field">
        <input
          name={name}
          type="number"
          className="text-center"
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
      </div>
    </div>
  );
};

export default NumberInput;