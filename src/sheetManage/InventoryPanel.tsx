import * as React from 'react';
import Sheet from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import DescriptionBox from '../controls/DescriptionBox';

const InventoryPanel: React.StatelessComponent<{ className?: string, sheet: Sheet }> =
  ({ className, sheet }) => {
    return (
      <SheetPanel
        title="Inventory"
        className={className}>

        <table className="table table-bordered table-hover">

          <thead>
            <tr>
              <th scope="col">Name</th>
              <th className="text-center" scope="col">Stock</th>
              <th scope="col">Description</th>
            </tr>
          </thead>

          <tbody>
            {sheet.inventory && sheet.inventory.map(i => (
              <tr key={i.name}>
                <td>{i.name}</td>
                <td className="text-center">{i.stock}</td>
                <td><DescriptionBox description={i.description} /></td>
              </tr>
            ))}
          </tbody>

        </table>

      </SheetPanel>
    );
  };

export default InventoryPanel;