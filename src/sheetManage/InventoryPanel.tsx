import * as React from 'react';
import Sheet, { Item } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import InventoryPanelRow from './InventoryPanelRow';
import { ItemForm } from './ItemForm';

type InventoryPanelProps = {
  className?: string,
  sheet: Sheet,
  showModal: (modalElement: JSX.Element) => void,
  closeModal: () => void,
  updateItem: (item: Item) => void,
  addItem: (item: Item) => void,
  deleteItem: (itemIdentifier: string) => void
};

export default class InventoryPanel extends React.Component<InventoryPanelProps, { expanded: string }> {
  constructor(props: InventoryPanelProps) {
    super(props);

    this.state = { expanded: '' };

    this.showAddModal = this.showAddModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onExpand = this.onExpand.bind(this);
  }

  showAddModal() {
    const { addItem } = this.props;

    this.showModal(new Item({}), addItem);
  }

  showEditModal(item: Item) {
    const { updateItem } = this.props;

    this.showModal(item, updateItem);
  }

  showModal(item: Item, save: (item: Item) => void) {
    const { showModal, closeModal } = this.props;

    showModal((
      <ItemForm
        cancel={closeModal}
        item={item}
        save={i => { save(i); closeModal(); }}
      />
    ));
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
        onAdd={this.showAddModal}
        className={className}>

        <table className="table table-bordered table-hover">

          <thead>
            <tr>
              <th scope="col">Name</th>
              <th className="text-center" scope="col">Stock</th>
            </tr>
          </thead>

          <tbody>
            {sheet.inventory && sheet.inventory.map(i =>
              (
                <InventoryPanelRow
                  item={i}
                  itemKey={i.name}
                  deleteItem={deleteItem}
                  expand={() => this.onExpand(i)}
                  expanded={this.state.expanded === i.name}
                  updateItem={updateItem}
                  showUpdateItem={this.showEditModal}
                />
              ))}
          </tbody>
        </table>
      </SheetPanel>
    );
  }
}