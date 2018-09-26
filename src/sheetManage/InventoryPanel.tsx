import * as React from 'react';
import Sheet, { Item } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import InventoryPanelRow from './InventoryPanelRow';

type InventoryPanelProps = {
  className?: string,
  sheet: Sheet,
  showModal: (modalElement: JSX.Element) => void,
  closeModal: () => void,
  updateItem: (index: number, item: Item) => void,
  addItem: (item: Item) => void,
  deleteItem: (item: Item) => void
};

export default class InventoryPanel extends React.Component<InventoryPanelProps, { expanded: string }> {
  constructor(props: InventoryPanelProps) {
    super(props);

    this.state = { expanded: '' };

    this.onExpand = this.onExpand.bind(this);
  }

  onExpand(item: Item) {
    const expanded = item.name === this.state.expanded ? '' : item.name;

    this.setState({ expanded });
  }

  render() {
    const { className, sheet, updateItem, deleteItem } = this.props;

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
            {sheet.inventory && sheet.inventory.map((i, ii) =>
              (
                <InventoryPanelRow
                  index={ii}
                  item={i}
                  itemKey={i.name}
                  deleteItem={deleteItem}
                  expand={() => this.onExpand(i)}
                  expanded={this.state.expanded === i.name}
                  updateItem={(index, item) => updateItem(index, item)}
                />
              ))}
          </tbody>
        </table>
      </SheetPanel>
    );
  }
}