import * as React from 'react';
import combineClasses from '../controls/combineClasses';

const SheetPanel: React.StatelessComponent<{ title: string, className?: string }> =
  ({ title, className, children }) => {
    const classes = combineClasses(className, 'sheet-panel card pt-4');

    return (
      <div className={classes}>
        <h2>{title}</h2>
        {children}
      </div>
    );
  };

export default SheetPanel;