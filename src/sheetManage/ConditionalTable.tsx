import * as React from 'react';
import Sheet, { Conditional, calculateFormula } from '../sheet/SheetModel';
import combineClasses from '../controls/combineClasses';

const toRow = (key: string, conditional: Conditional, sheet: Sheet) => {
  var calculatedValue = calculateFormula(sheet, conditional.formula).toString();

  return (
    <tr key={key}>
      <td>{conditional.condition}</td>
      <td className="text-center">
        {conditional.formula === calculatedValue 
          ? conditional.formula 
          : `"${conditional.formula}" => ${calculatedValue}`}
      </td>
      <td>{conditional.source}</td>
      <td>
        <button className="fill-cell m-0 btn btn-light">...</button>
      </td>
    </tr>
  );
};

const ConditionalTable: React.StatelessComponent<{ className?: string, sheet: Sheet, conditionals: Conditional[] }> =
  ({ className, sheet, conditionals }) => {

    const classes = combineClasses(className, 'table-responsive');

    return (
      <div className={classes}>
        <table className="table table-no-hover m-0">
          <tbody>
            {conditionals
              .sort(conditional => conditional.source ? 0 : 1)
              .map((conditional, index) => toRow(index.toString(), conditional, sheet))}
          </tbody>
        </table>
      </div>
    );
  };

export default ConditionalTable;