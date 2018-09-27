import * as React from 'react';
import combineClasses from './combineClasses';

const tooBigDescriptionLimit = 30;

type DescriptionBoxProps = {
  className?: string,
  description: string,
  placeholder?: string,
  onChange?: (newValue: string) => void
};

export class DescriptionBox extends React.Component<DescriptionBoxProps, {
  collapsed: boolean,
  editing: boolean,
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
    this.edit = this.edit.bind(this);

    this.state = {
      editing: false,
      collapsed: true, editValue: props.description!,
      dirty: false, resizeTextArea: false
    };
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
    if (limit >= description.length) {
      return description;
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
    this.setState({ collapsed: false, resizeTextArea: true });
  }

  edit(event: React.FormEvent<HTMLParagraphElement>) {
    event.preventDefault();
    this.setState({ editing: true, resizeTextArea: true });
  }

  hide(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.setState({ collapsed: true });
  }

  commit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.props.onChange!(this.state.editValue);
    this.setState({ dirty: false, editing: false });
  }

  cancel(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.setState({ editValue: this.props.description, dirty: false, editing: false });
  }

  renderCollapsed(description: string, needsCollapse: boolean) {
    return (
      <div className={combineClasses(this.props.className, '')}>
        <p
          onClick={this.edit}
          className="d-inline pr-2 d-inline clickable">
          {description ? this.smallify(tooBigDescriptionLimit, description) : this.props.placeholder}
        </p>
        {needsCollapse ?
          <button className="btn btn-link d-inline float-right" onClick={this.show}>Show</button> : undefined}
      </div>
    );
  }

  componentDidUpdate() {
    if (this.state.resizeTextArea && this.textInput.current) {
      this.textInput.current!.style.height = this.textInput.current!.scrollHeight + 'px';
      this.setState({ resizeTextArea: false });
    }
  }

  renderExpanded(description: string, needsCollapse: boolean) {

    const showEdit = this.state.editing || this.state.dirty;

    return (
      <div className={this.props.className}>
        {
          this.props.onChange ?
            <textarea
              placeholder={this.props.placeholder}
              ref={this.textInput}
              className="form-control"
              value={this.state.editValue}
              onChange={e => {
                e.preventDefault();
                this.setState({ editValue: e.target.value, dirty: true });
              }} /> :
            <p>{description}</p>
        }

        {showEdit ? undefined : needsCollapse ?
          <button className="btn btn-link float-right" onClick={this.hide}>Hide</button> : undefined}
        {showEdit ?
          <div className="btn-group float-right" role="group">
            <button className="btn btn-outline-danger" onClick={this.cancel} type="button">‎X</button>
            <button className="btn btn-outline-success" onClick={this.commit} type="button">✓</button>
          </div> :
          undefined}
      </div>
    );
  }

  render() {
    const needsCollapse = this.needsCollapse();
    const description = this.props.description || '';
    const collapsed = this.state.collapsed && !this.state.editing;

    console.log(this.state);

    return collapsed
      ? this.renderCollapsed(description, needsCollapse)
      : this.renderExpanded(description, needsCollapse);
  }
}

export default DescriptionBox;