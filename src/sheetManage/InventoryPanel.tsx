import * as React from 'react';
import Sheet, { Item } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import DetailBox from '../controls/DetailBox';
import Spinner from '../controls/Spinner';

const InventoryPanel: React.StatelessComponent<{
  className?: string,
  sheet: Sheet,
  updateItem: (item: Item) => void
}> = ({ className, sheet, updateItem }) => {
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
              <td><DetailBox name={i.name} description={i.description} /></td>
              <td className="text-center">
                <Spinner
                  min={0}
                  update={s => {
                    const newItem = Object.assign({}, i, { stock: s });
                    updateItem(newItem);
                  }}
                  value={i.stock}
                />
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </SheetPanel>
  );
};

export default InventoryPanel;