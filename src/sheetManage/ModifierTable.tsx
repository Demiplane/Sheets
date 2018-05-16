import * as React from 'react';
import Sheet, { Modifier, calculateFormula, modifierIsBase, modifierIsSimple } from '../sheet/SheetModel';
import combineClasses from '../controls/combineClasses';

const toRow = (key: string, sheet: Sheet, modifier: Modifier) => {
  let calculatedValue = calculateFormula(sheet, modifier.formula).toString();
  let isBase = modifierIsBase(modifier);
  let isSimple = modifierIsSimple(modifier);

  return (
    <tr key={key}>
      <td>{modifier.source ? modifier.source : isBase ? 'base' : ''}</td>
      <td className="text-center">
        <strong>{calculatedValue}</strong>
        {!isSimple && <br />}
        {!isSimple && <small className="text-muted">{`( ${modifier.formula} )`}</small>}
      </td>
      <td>{modifier.condition}</td>
    </tr>
  );
};

const ModifierTable: React.StatelessComponent<{ className?: string, sheet: Sheet, modifiers: Modifier[] }> =
  ({ className, sheet, modifiers }) => {

    const classes = combineClasses(className, 'table-responsive');

    return (
      <div className={classes}>
        <table className="table table-no-hover m-0">
          <tbody>
            {modifiers.map((modifier, index) => toRow(index.toString(), sheet, modifier))}
          </tbody>
        </table>
      </div>
    );
  };

export default ModifierTable;