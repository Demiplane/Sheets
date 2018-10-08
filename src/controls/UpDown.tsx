import * as React from 'react';
import combineClasses from './combineClasses';

const UpDown: React.StatelessComponent<{
  className?: string,
  onUp: () => void,
  onDown: () => void
}> = ({ className, onUp, onDown }) => {
  const classes = combineClasses('btn-group-vertical', className);

  return (
    <div className={classes}>
      <button
        className="btn btn-sm btn-secondary pt-0 pb-0"
        onClick={evt => { evt.preventDefault(); onUp(); }}
        type="button">↑</button>
      <button
        className="btn btn-sm btn-secondary pt-0 pb-0"
        onClick={evt => { evt.preventDefault(); onDown(); }}
        type="button">↓</button>
    </div>
  );
};

export default UpDown;
