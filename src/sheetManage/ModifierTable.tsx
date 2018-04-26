import * as React from 'react';
import { Modifier } from '../sheet/SheetModel';
import combineClasses from '../controls/combineClasses';

const ModifierTable: React.StatelessComponent<{ className?: string, modifiers: Modifier[] }> =
  ({ className, modifiers }) => {

    const classes = combineClasses(className, 'table-responsive');

    return (
      <div className={classes}>
        <table className="table table-no-hover m-0">
          <tbody>
            {modifiers.map((modifier, index) => (
              <tr key={index.toString()}>
                <td colSpan={modifier.source ? 1 : 2}>{modifier.formula}</td>
                {modifier.source && <td>{modifier.source}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default ModifierTable;