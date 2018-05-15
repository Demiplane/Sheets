import * as React from 'react';
import combineClasses from '../controls/combineClasses';

const SheetPanel: React.StatelessComponent<{ title: string, className?: string, onAdd?: () => void }> =
  ({ title, className, children, onAdd }) => {
    const classes = combineClasses(className, 'sheet-panel card pt-4');

    return (
      <div className={classes}><h2>
        {title}
        {onAdd
          ? (
            <button
              className="btn btn-outline-primary btn-small float-right"
              onClick={event => { event.preventDefault(); onAdd(); }}
            >+</button>
          )
          : null}</h2>
        {children}
      </div>
    );
  };

export default SheetPanel;