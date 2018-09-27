import * as React from 'react';
import Sheet, { Item } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import InlineEdit from '../controls/InlineEdit';
import { DescriptionBox } from '../controls/DescriptionBox';
import NumberInput from '../controls/NumberInput';
import AddBox from '../controls/AddBox';
import DeleteButton from '../controls/DeleteButton';

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
    const { className, sheet, addItem, updateItem, deleteItem } = this.props;

    return (
      <SheetPanel
        title="Inventory"
        className={className}>

        <table className="table table-bordered table-hover">
          <tbody>
            {sheet.inventory && sheet.inventory.map((item, index) =>
              (
                <tr key={item.name}>
                  <td style={{ width: '99%' }}>
                    <InlineEdit
                      priorValue={item.name}
                      onChange={name => updateItem(index, item.updateName(name))}
                    />
                    <br />
                    <DescriptionBox
                      className="text-muted small"
                      placeholder="<enter description>"
                      description={item.description}
                      onChange={description => updateItem(index, item.updateDescription(description))}
                    />
                  </td>
                  <td>
                    <NumberInput
                      value={item.stock}
                      onChange={stock => updateItem(index, item.updateStock(stock))}
                    />
                  </td>
                  <td>
                    <DeleteButton onDelete={() => deleteItem(item)} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <AddBox onAdd={s => addItem(new Item({name: s}))} />
      </SheetPanel>
    );
  }
}