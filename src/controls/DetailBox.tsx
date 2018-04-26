import * as React from 'react';
import combineClasses from '../controls/combineClasses';

type DetailBoxProps = {
  className?: string,
  name: string,
  description?: string
};

export class DetailBox extends React.Component<DetailBoxProps, { collapsed: boolean }> {
  constructor(props: DetailBoxProps) {
    super(props);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this.state = { collapsed: true };
  }

  needsCollapse(): boolean {
    return this.props.description
      ? true
      : false;
  }

  show(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.setState({ collapsed: false });
  }

  hide(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.setState({ collapsed: true });
  }

  renderCollapsed(name: string) {
    const classes = combineClasses(this.props.className, '');

    return (
      <div className={classes}>
        <button className="btn btn-light text-left pt-0 pb-0" onClick={this.show}>{name}</button>
      </div>
    );
  }

  renderExpanded(name: string, description: string) {
    const classes = combineClasses(this.props.className, '');

    return (
      <div className={classes}>
        <button className="btn btn-light pt-0 pb-0" onClick={this.hide}>{name}</button>
        <p>{description}</p>
      </div>
    );
  }

  renderStandard(name: string) {
    const classes = combineClasses(this.props.className, 'pb-0 mb-0');

    return <p className={classes}>{name}</p>;
  }

  render() {
    const needsCollapse = this.needsCollapse();
    const description = this.props.description || '';
    const name = this.props.name;
    const collapsed = this.state.collapsed;

    return needsCollapse ? collapsed
      ? this.renderCollapsed(name)
      : this.renderExpanded(name, description)
      : this.renderStandard(name);
  }
}

export default DetailBox;