import * as React from 'react';

const SheetPanel: React.StatelessComponent<{ title: string, className?: string }> =
  ({ title, className, children }) => {

    return (
      <div className={className}>
        <div className="sheet-panel card p-4 mt-4">
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    );
  };

export default SheetPanel;