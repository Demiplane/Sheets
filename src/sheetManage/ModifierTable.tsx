import * as React from 'react';
import Sheet, { Modifier, calculateFormula } from '../sheet/SheetModel';
import combineClasses from '../controls/combineClasses';

const toRow = (key: string, sheet: Sheet, modifier: Modifier) => {
  var calculatedValue = calculateFormula(sheet, modifier.formula).toString();

  return (
    <tr key={key}>
      <td>{modifier.source}</td>
      <td className="text-center">
        {modifier.formula === calculatedValue 
          ? modifier.formula 
          : `"${modifier.formula}" => ${calculatedValue}`}</td>
      <td>
        <button className="fill-cell m-0 btn btn-light">...</button>
      </td>
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