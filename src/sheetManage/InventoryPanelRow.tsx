import * as React from 'react';
import { Item } from '../sheet/SheetModel';
import NumberInput from '../controls/NumberInput';
import toDetailRowPair, { DetailRowPairProps } from '../controls/toDetailRowPair';

type InventoryPanelRowProps = DetailRowPairProps & {
  updateItem: (item: Item) => void;
  showUpdateItem: (item: Item) => void;
  deleteItem: (itemIdentifier: number) => void;
  item: Item
};

export default class InventoryPanelRow extends React.Component<InventoryPanelRowProps> {
  constructor(props: InventoryPanelRowProps) {
    super(props);
  }

  render() {
    return toDetailRowPair(this.props, this.row, this.detail);
  }

  row(props: InventoryPanelRowProps): React.ReactNode {
    const { item, updateItem } = props;

    return [
      (<td>{item.name}</td>),
      (
        <td className="text-center">
          <NumberInput
            min={0}
            onChange={s => {
              const newItem = Object.assign({}, item, { stock: s });
              updateItem(newItem);
            }}
            value={item.stock}
          />
        </td>
      )
    ];
  }

  detail(props: InventoryPanelRowProps): React.ReactNode {
    const { item, deleteItem, showUpdateItem } = props;

    return (
      <td colSpan={2} className="p-2 pb-4">
        {item.description ? <p>{item.description}</p> : null}
        <button
          onClick={event => { event.preventDefault(); deleteItem(item.id); }}
          className="btn btn-outline-danger float-right btn-small d-inline mt-2">Delete</button>
        <button
          onClick={event => { event.preventDefault(); showUpdateItem(item); }}
          className="btn btn-outline-primary float-right btn-small d-inline mt-2">Edit</button>
      </td>
    );
  }
}