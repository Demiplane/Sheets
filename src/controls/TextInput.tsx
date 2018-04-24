import * as React from 'react';
import combineClasses from './combineClasses';

type TextInputProps = {
  name?: string,
  label?: string,
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void,
  placeholder?: string,
  value?: string,
  error?: string,
  className?: string
};

const TextInput: React.StatelessComponent<TextInputProps> =
  ({ name, label, onChange, placeholder, value, error, className }) => {
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
      wrapperClass += ' ' + 'has-error';
    }

    let classes = combineClasses(wrapperClass, className);

    return (
      <div className={classes}>
        <label className="mr-2" htmlFor={name}>{label}</label>
        <div className="field">
          <input
            type="text"
            name={name}
            className="form-control"
            placeholder={placeholder}
            value={value}
            onChange={onChange} />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    );
  };

export default TextInput;