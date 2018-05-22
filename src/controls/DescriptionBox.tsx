import * as React from 'react';
import combineClasses from './combineClasses';

const tooBigDescriptionLimit = 30;

type DescriptionBoxProps = {
  className?: string,
  description?: string
};

export class DescriptionBox extends React.Component<DescriptionBoxProps, { collapsed: boolean }> {
  constructor(props: DescriptionBoxProps) {
    super(props);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this.state = { collapsed: true };
  }

  needsCollapse(): boolean {
    return this.props.description
      ? this.props.description.length > tooBigDescriptionLimit
      : false;
  }

  smallify(limit: number, description?: string) {
    if (!description) {
      return '';
    }

    let small = '';
    let cache = '';

    for (const character of description) {
      if (character === ' ') {
        if (small.length + cache.length > limit) {
          if (small.length === 0) {
            small = description.substring(0, limit);
          }
          break;
        } else {
          small += cache;
          cache = '';
        }
      }

      if (cache.length >= limit) {
        small += cache;
        break;
      }

      cache += character;
    }

    small += 
      small.length > 0 
      ? small.endsWith('...') 
        ? '' 
        : small.endsWith('..') 
          ? '.' 
          : small.endsWith('.') 
            ? '..' 
          : '...' 
        : '';

    return small;
  }

  trimTrailingPeriod(words: string) {
    // words[words.length-1] == '.' ? 
    return words;
  }

  show(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.setState({ collapsed: false });
  }

  hide(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.setState({ collapsed: true });
  }

  renderCollapsed(description: string) {
    return (
      <div className={combineClasses(this.props.className, '')}>
        <p className="d-inline pr-2 d-inline">{this.smallify(tooBigDescriptionLimit, description)}</p>
        <button className="btn btn-link d-inline float-right" onClick={this.show}>Show</button>
      </div>
    );
  }

  renderExpanded(description: string) {
    return (
      <div className={this.props.className}>
        <p>{description}</p>
        <button className="btn btn-link float-right" onClick={this.hide}>Hide</button>
      </div>
    );
  }

  renderStandard(description: string) {
    return <p className={this.props.className}>{description}</p>;
  }

  render() {
    const needsCollapse = this.needsCollapse();
    const description = this.props.description || '';
    const collapsed = this.state.collapsed;

    return needsCollapse ? collapsed
      ? this.renderCollapsed(description)
      : this.renderExpanded(description)
      : this.renderStandard(description);
  }
}

export default DescriptionBox;