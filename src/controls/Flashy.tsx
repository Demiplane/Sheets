import * as React from 'react';

type FlashyProps = {
  display?: string;
  value?: number;
};

type FlashyState = {
  oldDisplay?: string;
  oldValue?: number;
  flash: boolean;
  positive: boolean;
};

export default class Flashy extends React.Component<FlashyProps, FlashyState> {
  constructor(props: FlashyProps) {
    super(props);
    this.state = { oldDisplay: props.display, oldValue: props.value, flash: false, positive: true };
  }

  componentWillReceiveProps(props: FlashyProps) {
    const { oldDisplay, oldValue } = this.state;
    const { display, value } = props;

    const flash = props.display !== oldDisplay || props.value !== oldValue;
    const positive = props.value && oldValue ? props.value > oldValue : true;

    this.setState({ oldValue: value, oldDisplay: display, flash, positive });
  }

  render() {
    const { display, value } = this.props;
    const { flash, positive } = this.state;
    const flashClass = positive ? 'flash-positive-when-updated' : 'flash-negative-when-updated';
    const id = flash ? Math.random().toString() : '';

    return (
      <div
        key={id}
        className={flash ? flashClass : ''}>
        {display}
        {value}
      </div>
    );
  }
}