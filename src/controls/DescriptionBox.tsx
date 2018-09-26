import * as React from 'react';
import combineClasses from './combineClasses';

const tooBigDescriptionLimit = 30;

type DescriptionBoxProps = {
  className?: string,
  description: string,
  onChange?: (newValue: string) => void
};

export class DescriptionBox extends React.Component<DescriptionBoxProps, {
  collapsed: boolean,
  editValue: string,
  dirty: boolean,
  resizeTextArea: boolean
}> {

  textInput: React.RefObject<HTMLTextAreaElement>;

  constructor(props: DescriptionBoxProps) {
    super(props);

    this.textInput = React.createRef();

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.cancel = this.cancel.bind(this);
    this.commit = this.commit.bind(this);

    this.state = { collapsed: true, editValue: props.description!, dirty: false, resizeTextArea: false };
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

  show(event: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLParagraphElement>) {
    event.preventDefault();
    this.setState({ collapsed: false, resizeTextArea: true });
  }

  hide(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.setState({ collapsed: true });
  }

  commit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.props.onChange!(this.state.editValue);
    this.setState({ dirty: false });
  }

  cancel(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.setState({ editValue: this.props.description, dirty: false });
  }

  renderCollapsed(description: string) {
    return (
      <div className={combineClasses(this.props.className, '')}>
        <p
          onClick={this.show}
          className="d-inline pr-2 d-inline clickable">{this.smallify(tooBigDescriptionLimit, description)}</p>
        <button className="btn btn-link d-inline float-right" onClick={this.show}>Show</button>
      </div>
    );
  }

  componentDidUpdate() {
    if (this.state.resizeTextArea) {
      this.textInput.current!.style.height = this.textInput.current!.scrollHeight + 'px';
      this.setState({ resizeTextArea: false });
    }
  }

  renderExpanded(description: string) {
    return (
      <div className={this.props.className}>
        {
          this.props.onChange ?
            <textarea
              ref={this.textInput}
              className="form-control"
              value={this.state.editValue}
              onChange={e => {
                e.preventDefault();
                this.setState({ editValue: e.target.value, dirty: true });
              }} /> :
            <p>{description}</p>
        }

        {this.state.dirty ? undefined : <button className="btn btn-link float-right" onClick={this.hide}>Hide</button>}
        {this.state.dirty ?
          <button className="btn btn-outline-danger float-right" onClick={this.cancel} type="button">‎X</button> :
          undefined}
        {this.state.dirty ?
          <button className="btn btn-outline-success float-right" onClick={this.commit} type="button">✓</button> :
          undefined}
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