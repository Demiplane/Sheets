import * as React from 'react';
import Sheet from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import DetailBox from '../controls/DetailBox';

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
            </tr>
          </thead>

          <tbody>
            {sheet.inventory && sheet.inventory.map(i => (
              <tr key={i.name}>
                <td><DetailBox name={i.name} description={i.description} />  </td>
                <td className="text-center">{i.stock}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </SheetPanel>
    );
  };

export default InventoryPanel;