import * as React from 'react';
import Sheet, { Item } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import InlineEdit from '../controls/InlineEdit';
import { DescriptionBox } from '../controls/DescriptionBox';
import NumberInput from '../controls/NumberInput';
import AddBox from '../controls/AddBox';
import DeleteButton from '../controls/DeleteButton';
import UpDown from '../controls/UpDown';

type InventoryPanelProps = {
  className?: string,
  sheet: Sheet,
  showModal: (modalElement: JSX.Element) => void,
  closeModal: () => void,
  updateItem: (index: number, item: Item) => void,
  addItem: (item: Item) => void,
  deleteItem: (item: Item) => void,
  reorder: (from: number, to: number) => void
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
    const { className, sheet, addItem, updateItem, deleteItem } = this.props;

    return (
      <SheetPanel
        title="Inventory"
        className={className}>

        <div className="list-group">
          {sheet.inventory && sheet.inventory.map((item, index) =>
            (
              <div key={item.name}
                className="list-group-item d-flex align-items-center">
                <div style={{ width: '100%' }}>
                  <InlineEdit
                    priorValue={item.name}
                    onChange={name => updateItem(index, item.updateName(name))}
                  />
                  <DescriptionBox
                    className="text-muted small"
                    placeholder="<enter description>"
                    description={item.description}
                    onChange={description => updateItem(index, item.updateDescription(description))}
                  />
                </div>
                <div className="pl-2 hide-unless-hover">
                  <NumberInput
                    value={item.stock}
                    onChange={stock => updateItem(index, item.updateStock(stock))}
                  />
                </div>
                <div className="pl-2 hide-on-hover">
                  <p>{item.stock}</p>
                </div>
                <div className="pl-2 hide-unless-hover">
                  <DeleteButton onDelete={() => deleteItem(item)} />
                </div>
                <div className="pl-2 hide-unless-hover">
                  <UpDown
                    onUp={() => this.props.reorder(index, index - 1)}
                    onDown={() => this.props.reorder(index, index + 1)} />
                </div>
              </div>
            ))}
        </div>
        <AddBox placeholder="add item" onAdd={s => addItem(new Item({ name: s }))} />
      </SheetPanel>
    );
  }
}