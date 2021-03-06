import * as React from 'react';
import { Sheet } from '../sheet/SheetModel';

type SheetRowProps = {
  sheet: Sheet;
  onSelected?: (identifier: string) => void;
};

const SheetRow: React.StatelessComponent<SheetRowProps> = (props) => {
  let sheet = props.sheet || { id: '0', name: 'Unknown' };
  let onClick = (props.sheet && props.onSelected)
    ? () => props.onSelected!(sheet.name)
    : () => undefined;

  return (
    <tr className="sheet-row" onClick={onClick}>
      <td>{sheet.name}</td>
    </tr>
  );
};

export default SheetRow;