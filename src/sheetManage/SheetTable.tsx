import * as React from 'react';
import combineClasses from '../controls/combineClasses';

type SheetTableProps = {
  fields: string[],
  className?: string
};

const SheetTable: React.StatelessComponent<SheetTableProps> = ({ fields, className, children }) => {
  const classes = combineClasses(className, 'table table-bordered table-hover');

  return (
    <table className={classes}>
      <thead>
        <tr>
          {fields.map(f => <th scope="col" key={f}>{f}</th>)}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  );
};

export default SheetTable;