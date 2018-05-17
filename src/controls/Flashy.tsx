import * as React from 'react';

type FlashyProps = {
  display: string;
};

type FlashyState = {
  display: string;
  flash: boolean;
};

export default class Flashy extends React.Component<FlashyProps, FlashyState> {
  constructor(props: FlashyProps) {
    super(props);
    this.state = { display: props.display, flash: false };
  }

  componentWillReceiveProps(props: FlashyProps) {
    this.setState({ display: props.display, flash: props.display !== this.state.display });
  }

  render() {
    const flashClass = 'flash-when-updated';
    const { display } = this.props;
    const { flash } = this.state;

    const id = flash ? Math.random().toString() : '';

    return (
      <div
        key={id}
        className={flash ? flashClass : ''}>
        {display}
      </div>
    );
  }
}