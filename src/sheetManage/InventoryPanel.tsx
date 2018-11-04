import * as React from 'react';
import Sheet, { Item } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import InlineEdit from '../controls/InlineEdit';
import { DescriptionBox } from '../controls/DescriptionBox';
import NumberInput from '../controls/NumberInput';
import MegaTable from '../controls/MegaTable';

type InventoryPanelProps = {
  className?: string,
  sheet: Sheet,
  updateItem: (index: number, item: Item) => void,
  addItem: (item: Item) => void,
  deleteItem: (item: Item) => void,
  reorder: (from: number, to: number) => void
};

class Table extends MegaTable<Item> { }

export default class InventoryPanel extends React.Component<InventoryPanelProps> {
  constructor(props: InventoryPanelProps) {
    super(props);
  }

  render() {
    const { className, sheet, addItem, updateItem, deleteItem, reorder } = this.props;

    return (
      <SheetPanel
        title="Inventory"
        className={className}>

        <Table
          searchTerms={item => [item.name]}
          add={name => addItem(new Item({ name }))}
          move={(from, to) => reorder(from, to)}
          remove={item => deleteItem(item)}

          addPlaceholder="add item"

          keySelector={item => item.name}
          items={sheet.inventory}
          render={(index, item) => [(
            <div key={item.name + 'name'} style={{ width: '100%' }}>
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
          ), (
            <div key={item.name + 'stock'} className="pl-2">
              <NumberInput
                value={item.stock}
                onChange={stock => updateItem(index, item.updateStock(stock))}
              />
            </div>
          )]}

        />
      </SheetPanel>
    );
  }
}