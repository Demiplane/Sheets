import * as React from 'react';
import combineClasses from '../controls/combineClasses';

const Spinner: React.StatelessComponent<{
  className?: string,
  update: (value: number) => void,
  value: number,
  min?: number,
  max?: number
}> = ({ className, update, value, min, max }) => {

  const classes = combineClasses(className, 'text-center');

  return (
    <input
      type="number"
      className={classes}
      value={value}
      min={min}
      max={max}
      onChange={event => { event.preventDefault(); update(Number(event.currentTarget.value)); }}
    />
  );
};

export default Spinner;