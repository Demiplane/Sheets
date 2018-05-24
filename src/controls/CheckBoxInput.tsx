import * as React from 'react';
import combineClasses from './combineClasses';

const CheckBoxInput: React.StatelessComponent<{
  name?: string,
  className?: string,
  label?: string,
  onChange: (checked: boolean) => void,
  checked: boolean
}> = ({ className, label, onChange, checked }) => {
  let wrapperClass = label ? 'form-check' : '';

  const classes = combineClasses(wrapperClass, className);

  return (
    <div className={classes}>
      {label && <label className="mr-2" htmlFor={name}>{label}</label>}
      <div className="field">
        <input
          name={name}
          type="checkbox"
          className="text-center"
          checked={checked}
          onClick={event => event.stopPropagation()}
          onChange={event => {
            event.preventDefault();
            onChange(event.currentTarget.checked);
            event.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};

export default CheckBoxInput;