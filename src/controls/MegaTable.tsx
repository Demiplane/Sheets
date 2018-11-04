import * as React from 'react';
import AddBox from '../controls/AddBox';

type MegaTableProps<T> = {
  items: T[],
  addPlaceholder?: string,
  render: (index: number, item: T) => JSX.Element[],
  keySelector?: (item: T) => string,
  add?: (value: string) => void,
  more?: (item: T) => void,
  expand?: (item: T) => JSX.Element,
  remove?: (removed: T) => void,
  move?: (fromIndex: number, toIndex: number) => void,
  searchTerms?: (item: T) => string[],
  className?: string
};

class MegaTable<T> extends React.Component<
  MegaTableProps<T>,
  { expanded: string[], search: string }> {
  constructor(props: MegaTableProps<T>) {
    super(props);

    this.toggleExpansion = this.toggleExpansion.bind(this);

    this.state = { expanded: [], search: '' };
  }

  toggleExpansion(key: string) {

    const expanded = this.state.expanded.indexOf(key) >= 0;

    this.setState(expanded ?
      { expanded: this.state.expanded.filter(e => e !== key) } :
      { expanded: [...this.state.expanded, key] });
  }

  itemFilter(item: T): boolean {
    const terms = this.props.searchTerms!(item);

    return terms
      .map(term => term.toLowerCase())
      .filter(term => term.indexOf(this.state.search) !== -1).length > 0;
  }

  getItemFilter() {
    return this.props.searchTerms ?
      (item: T) => this.itemFilter(item) :
      () => true;
  }

  render() {
    const { items, addPlaceholder, add, remove, more,
      expand, move, className, render, keySelector, searchTerms } = this.props;

    const itemFilter = this.getItemFilter();

    return (
      <div className={className}>

        {searchTerms ?
          (
            <div>
              <input className="form-control" type="text" placeholder="search"
                onKeyUp={evt => {
                  if (evt.key === 'Escape') {
                    evt.currentTarget.value = '';
                    return this.setState({ search: '' });
                  } else {
                    this.setState({ search: evt.currentTarget.value.toLowerCase() });
                  }
                }}
              />
            </div>
          ) : undefined
        }

        <div
          className="list-group">
          {items && items
            .filter(itemFilter)
            .map((item, index) => {

              const key = keySelector ? keySelector(item) : index.toString();
              const expanded = this.state.expanded.indexOf(key) >= 0;

              return [(
                <div key={key}
                  style={{ zIndex: 5 + items.length - index }}
                  className="list-group-item d-flex align-items-center">

                  {render(index, item)}

                  <div className="pr-2 position-absolute hide-unless-hover"
                    style={{ right: '0', bottom: '-23px', zIndex: 99 }}>
                    <div className="m-2 btn-group">
                      {expand ? <button className="btn btn-info btn-sm" onClick={evt => {
                        evt.preventDefault();
                        this.toggleExpansion(key);
                      }}>＋</button> : undefined}
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
              ), (
                (expand && expanded) ?
                  (<div key={key + 'expand'} className="card bg-light p-4">
                    {expand(item)}
                  </div>
                  ) :
                  undefined
              )];
            })}
        </div>

        {add ? (
          <AddBox
            placeholder={addPlaceholder ? addPlaceholder : 'add item'}
            onAdd={value => add(value)} />
        ) : undefined}
      </div>);
  }
}

// <button className="btn btn-success btn-sm">✓</button>

export default MegaTable;