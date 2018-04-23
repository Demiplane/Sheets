import * as React from 'react';

type TextInputProps = {
  name?: string, 
  label?: string,
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void, 
  placeholder?: string, 
  value?: string, 
  error?: string
};

const TextInput: React.StatelessComponent<TextInputProps> = 
({name, label, onChange, placeholder, value, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += ' ' + 'has-error';
  }

  return (
    <div className={wrapperClass}>
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