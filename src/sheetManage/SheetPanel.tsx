import * as React from 'react';

const SheetPanel: React.StatelessComponent<{ title: string, className?: string, onAdd?: () => void }> =
  ({ title, className, children, onAdd }) => {

    return (
      <div className={className}>
        <div className="sheet-panel card p-4 mt-4">
          <h2>
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
      </div>
    );
  };

export default SheetPanel;