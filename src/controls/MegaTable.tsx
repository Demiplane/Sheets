import * as React from 'react';
import AddBox from '../controls/AddBox';

type MegaTableProps<T> = {
  items: T[],
  render: (index: number, item: T) => JSX.Element[],
  keySelector: (item: T) => string,
  add?: (value: String) => void,
  more?: (item: T) => void,
  remove?: (removed: T) => void,
  move?: (fromIndex: number, toIndex: number) => void,
  className?: string
};

class MegaTable<T> extends React.Component<MegaTableProps<T>> {
  constructor(props: MegaTableProps<T>) {
    super(props);
  }

  render() {
    const { items, add, remove, more, move, className, render, keySelector } = this.props;

    return (
      <div className={className}>
        <div
          className="list-group">
          {items && items.map((item, index) => (
            <div key={keySelector(item)}
              style={{ zIndex: 5 }}
              className="list-group-item d-flex align-items-center">

              {render(index, item)}

              <div className="pr-2 position-absolute hide-unless-hover"
                style={{ right: '0', bottom: '-20px', zIndex: 99 }}>
                <div className="m-2 btn-group">
                  {more ? <button className="btn btn-info btn-sm" onClick={evt => {
                    evt.preventDefault();
                    more(item);
                  }}>⋯</button> : undefined}
                  {move ? <button className="btn btn-secondary btn-sm" onClick={evt => {
                    evt.preventDefault();
                    move(index, index + 1);
                  }}>↓</button> : undefined}
                  {move ? <button className="btn btn-secondary btn-sm" onClick={evt => {
                    evt.preventDefault();
                    move(index, index - 1);
                  }}>↑</button> : undefined}
                  {remove ? <button className="btn btn-danger btn-sm" onClick={evt => {
                    evt.preventDefault();
                    remove(item);
                  }}>✘</button> : undefined}
                </div>
              </div>
            </div>
          ))}
        </div>

        {add ? <AddBox placeholder="add ability" onAdd={value => add(value)} /> : undefined}
      </div>);
  }
}

// <button className="btn btn-primary btn-sm">＋</button>
// <button className="btn btn-success btn-sm">✓</button>

export default MegaTable;