import * as React from 'react';
import Sheet, { Modifier, calculateFormula, modifierIsBase } from '../sheet/SheetModel';
import combineClasses from '../controls/combineClasses';

const toRow = (key: string, sheet: Sheet, modifier: Modifier) => {
  let calculatedValue = calculateFormula(sheet, modifier.formula).toString();
  let isBase = modifierIsBase(modifier);

  return (
    <tr key={key}>
      <td>{modifier.source ? modifier.source : isBase ? 'base' : ''}</td>
      <td className="text-center">
        {isBase
          ? modifier.formula
          : `"${modifier.formula}" => ${calculatedValue}`}</td>
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