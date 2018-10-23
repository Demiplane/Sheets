import * as React from 'react';
import AddBox from '../controls/AddBox';
import DeleteButton from '../controls/DeleteButton';
import UpDown from '../controls/UpDown';

type MegaTableProps<T> = {
  items: T[],
  render: (index: number, item: T) => JSX.Element[],
  keySelector: (item: T) => string,
  add: (value: String) => void,
  remove: (removed: T) => void,
  move: (fromIndex: number, toIndex: number) => void,
  className?: string
};

class MegaTable<T> extends React.Component<MegaTableProps<T>> {
  constructor(props: MegaTableProps<T>) {
    super(props);
  }

  render() {
    const { items, add, remove, move, className, render, keySelector } = this.props;

    return (
      <div className={className}>
        <div
          className="list-group">
          {items && items.map((item, index) => (
            <div key={keySelector(item)}
              className="list-group-item d-flex align-items-center">

              {render(index, item)}

              <div className="pl-2 hide-unless-hover">
                <DeleteButton onDelete={() => remove(item)} />
              </div>
              <div className="pl-2 hide-unless-hover">
                <UpDown
                  onUp={() => move(index, index - 1)}
                  onDown={() => move(index, index + 1)} />
              </div>
            </div>
          ))}
        </div>

        <AddBox placeholder="add ability" onAdd={value => add(value)} />
      </div>);
  }
}

export default MegaTable;