import * as React from 'react';
import AddBox from '../controls/AddBox';

type MegaTableProps<T> = {
  items: T[],
  render: (index: number, item: T) => JSX.Element[],
  keySelector?: (item: T) => string,
  add?: (value: String) => void,
  more?: (item: T) => void,
  expand?: (item: T) => JSX.Element,
  remove?: (removed: T) => void,
  move?: (fromIndex: number, toIndex: number) => void,
  className?: string
};

class MegaTable<T> extends React.Component<MegaTableProps<T>, { expanded: string[] }> {
  constructor(props: MegaTableProps<T>) {
    super(props);

    this.toggleExpansion = this.toggleExpansion.bind(this);

    this.state = { expanded: [] };
  }

  toggleExpansion(key: string) {

    const expanded = this.state.expanded.indexOf(key) >= 0;

    this.setState(expanded ? 
      { expanded: this.state.expanded.filter(e => e !== key) } : 
      { expanded: [...this.state.expanded, key] });
  }

  render() {
    const { items, add, remove, more, expand, move, className, render, keySelector } = this.props;

    return (
      <div className={className}>
        <div
          className="list-group">
          {items && items.map((item, index) => {

            const key = keySelector ? keySelector(item) : index.toString();
            const expanded = this.state.expanded.indexOf(key) >= 0;

            return (
              <div key={key}
                style={{ zIndex: 5 + items.length - index }}
                className="list-group-item d-flex align-items-center">

                {render(index, item)}

                {expand && expanded ? expand(item) : undefined}

                <div className="pr-2 position-absolute hide-unless-hover"
                  style={{ right: '0', bottom: '-20px', zIndex: 99 }}>
                  <div className="m-2 btn-group">
                    {expand ? <button className="btn btn-info btn-sm" onClick={evt => {
                      evt.preventDefault();
                      this.toggleExpansion(key);
                    }}>+</button> : undefined}
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
            );
          })}
        </div>

        {add ? <AddBox placeholder="add ability" onAdd={value => add(value)} /> : undefined}
      </div>);
  }
}

// <button className="btn btn-primary btn-sm">＋</button>
// <button className="btn btn-success btn-sm">✓</button>

export default MegaTable;