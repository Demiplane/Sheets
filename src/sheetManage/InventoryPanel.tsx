import * as React from 'react';
import Sheet from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import DescriptionBox from '../controls/DescriptionBox';
import SheetTable from './SheetTable';

const InventoryPanel: React.StatelessComponent<{ className?: string, sheet: Sheet }> =
  ({ className, sheet }) => {
    return (
      <SheetPanel
        title="Inventory"
        className={className}>
        <SheetTable fields={['Name', 'Stock', 'Description']}>
          {sheet.inventory && sheet.inventory.map(i => (
            <tr key={i.name}>
              <td>{i.name}</td>
              <td className="text-center">{i.stock}</td>
              <td><DescriptionBox description={i.description} /></td>
            </tr>
          ))}
        </SheetTable>
      </SheetPanel>
    );
  };

export default InventoryPanel;